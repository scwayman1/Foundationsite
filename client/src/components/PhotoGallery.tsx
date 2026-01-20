import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, ImageOff, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Types
interface Photo {
  id: string;
  url: string;
  category: string;
  description: string;
  width: number;
  height: number;
}

interface PhotosResponse {
  photos: Photo[];
  categories: string[];
}

interface PhotoGalleryProps {
  baseUrl: string; // The photo server base URL
  apiEndpoint?: string; // Optional custom endpoint, defaults to /api/photos.json
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" as const }
  }
};

const tabVariants = {
  inactive: { scale: 1 },
  active: { scale: 1.02 }
};

export default function PhotoGallery({ baseUrl, apiEndpoint = "/api/photos.json" }: PhotoGalleryProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  // Fetch photos on mount
  useEffect(() => {
    const fetchPhotos = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${baseUrl}${apiEndpoint}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch photos: ${response.status}`);
        }
        const data: PhotosResponse = await response.json();
        setPhotos(data.photos);
        setCategories(data.categories);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load photos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, [baseUrl, apiEndpoint]);

  // Filter photos by category
  const filteredPhotos = activeCategory === "all"
    ? photos
    : photos.filter(photo => photo.category === activeCategory);

  // Get full image URL by prepending base URL
  const getFullImageUrl = (relativeUrl: string) => {
    return `${baseUrl}${relativeUrl}`;
  };

  // Format category name for display
  const formatCategoryName = (category: string) => {
    return category
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Lightbox navigation
  const navigateLightbox = (direction: "prev" | "next") => {
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto?.id);
    let newIndex: number;

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredPhotos.length - 1;
    } else {
      newIndex = currentIndex < filteredPhotos.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedPhoto(filteredPhotos[newIndex]);
    setLightboxIndex(newIndex);
  };

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;

      if (e.key === "Escape") {
        setSelectedPhoto(null);
      } else if (e.key === "ArrowLeft") {
        navigateLightbox("prev");
      } else if (e.key === "ArrowRight") {
        navigateLightbox("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhoto, filteredPhotos]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-12 h-12 text-blue-600" />
        </motion.div>
        <p className="mt-4 text-slate-600 font-medium">Loading gallery...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <ImageOff className="w-8 h-8 text-red-500" />
        </div>
        <p className="text-slate-900 font-semibold mb-2">Failed to load photos</p>
        <p className="text-slate-500 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Category Filter Tabs */}
      <motion.div
        className="flex flex-wrap gap-2 mb-8 justify-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.button
          variants={tabVariants}
          animate={activeCategory === "all" ? "active" : "inactive"}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveCategory("all")}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
            activeCategory === "all"
              ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25"
              : "glass-card text-slate-600 hover:text-blue-700 hover:border-blue-200"
          }`}
        >
          All Photos
        </motion.button>

        {categories.map((category) => (
          <motion.button
            key={category}
            variants={tabVariants}
            animate={activeCategory === category ? "active" : "inactive"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === category
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25"
                : "glass-card text-slate-600 hover:text-blue-700 hover:border-blue-200"
            }`}
          >
            {formatCategoryName(category)}
          </motion.button>
        ))}
      </motion.div>

      {/* Photo count */}
      <motion.p
        className="text-center text-slate-500 text-sm mb-6"
        key={activeCategory}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {filteredPhotos.length} {filteredPhotos.length === 1 ? "photo" : "photos"}
        {activeCategory !== "all" && ` in ${formatCategoryName(activeCategory)}`}
      </motion.p>

      {/* Masonry Grid */}
      <motion.div
        className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={activeCategory}
      >
        {filteredPhotos.map((photo, index) => (
          <motion.div
            key={photo.id}
            variants={itemVariants}
            className="break-inside-avoid"
          >
            <motion.div
              className="relative group rounded-xl overflow-hidden cursor-pointer glass-card border-white/50"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                setSelectedPhoto(photo);
                setLightboxIndex(index);
              }}
            >
              {/* Image */}
              <div
                className="relative overflow-hidden"
                style={{
                  aspectRatio: `${photo.width} / ${photo.height}`
                }}
              >
                <img
                  src={getFullImageUrl(photo.url)}
                  alt={photo.description}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                {/* Category badge */}
                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-medium">
                    {formatCategoryName(photo.category)}
                  </span>
                </div>

                {/* Description on hover */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                >
                  <p className="text-white text-sm font-medium line-clamp-2">
                    {photo.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty state */}
      {filteredPhotos.length === 0 && (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <ImageOff className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-600 font-medium">No photos in this category</p>
        </motion.div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Close button */}
            <motion.button
              className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedPhoto(null)}
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Navigation buttons */}
            <motion.button
              className="absolute left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("prev");
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <motion.button
              className="absolute right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("next");
              }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>

            {/* Image container */}
            <motion.div
              className="relative max-w-[90vw] max-h-[85vh] z-10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={getFullImageUrl(selectedPhoto.url)}
                alt={selectedPhoto.description}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />

              {/* Image info */}
              <motion.div
                className="absolute -bottom-16 left-0 right-0 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-white font-medium mb-1">{selectedPhoto.description}</p>
                <p className="text-white/60 text-sm">
                  {formatCategoryName(selectedPhoto.category)} • {lightboxIndex + 1} of {filteredPhotos.length}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
