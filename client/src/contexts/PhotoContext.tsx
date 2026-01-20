import { createContext, useContext, useEffect, useState, useCallback, useMemo, ReactNode } from "react";

// =============================================================================
// CONFIGURATION
// =============================================================================
const PHOTO_SERVER_BASE_URL = "https://coastgallery-aokxqmpi.manus.space";
const PHOTO_API_ENDPOINT = "/api/photos.json";

// =============================================================================
// TYPES
// =============================================================================
export interface Photo {
  id: string;
  url: string;           // Relative path from API
  fullUrl: string;       // Normalized full URL (auto-generated)
  category: string;
  description: string;
  width: number;
  height: number;
  aspectRatio: number;   // Auto-calculated for layout helpers
}

interface PhotosApiResponse {
  photos: Array<{
    id: string;
    url: string;
    category: string;
    description: string;
    width: number;
    height: number;
  }>;
  categories: string[];
}

interface PhotoContextState {
  // State
  photos: Photo[];
  categories: string[];
  isLoading: boolean;
  error: string | null;
  isReady: boolean;

  // Helper functions
  getRandomPhoto: (category?: string) => Photo | null;
  getPhotosByCategory: (category: string, limit?: number) => Photo[];
  getAllPhotos: () => Photo[];
  getPhotoById: (id: string) => Photo | null;
  getCategories: () => string[];

  // Advanced helpers for UI components
  getHeroPhoto: (category?: string) => Photo | null;
  getCardPhotos: (category: string, count: number) => Photo[];
  getBackgroundPhoto: (category?: string, preferLandscape?: boolean) => Photo | null;

  // URL helper (in case you need to construct URLs manually)
  getFullUrl: (relativePath: string) => string;

  // Refetch if needed
  refetch: () => Promise<void>;
}

// =============================================================================
// CONTEXT
// =============================================================================
const PhotoContext = createContext<PhotoContextState | null>(null);

// =============================================================================
// PROVIDER
// =============================================================================
interface PhotoProviderProps {
  children: ReactNode;
}

export function PhotoProvider({ children }: PhotoProviderProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Normalize a relative URL to a full URL
  const getFullUrl = useCallback((relativePath: string): string => {
    // Handle already-full URLs
    if (relativePath.startsWith("http://") || relativePath.startsWith("https://")) {
      return relativePath;
    }
    // Ensure path starts with /
    const normalizedPath = relativePath.startsWith("/") ? relativePath : `/${relativePath}`;
    return `${PHOTO_SERVER_BASE_URL}${normalizedPath}`;
  }, []);

  // Fetch and normalize photos
  const fetchPhotos = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${PHOTO_SERVER_BASE_URL}${PHOTO_API_ENDPOINT}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch photos: ${response.status} ${response.statusText}`);
      }

      const data: PhotosApiResponse = await response.json();

      // Normalize photos with full URLs and aspect ratios
      const normalizedPhotos: Photo[] = data.photos.map((photo) => ({
        ...photo,
        fullUrl: getFullUrl(photo.url),
        aspectRatio: photo.width / photo.height,
      }));

      setPhotos(normalizedPhotos);
      setCategories(data.categories || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load photos";
      setError(message);
      console.error("[PhotoEngine] Error fetching photos:", message);
    } finally {
      setIsLoading(false);
    }
  }, [getFullUrl]);

  // Fetch on mount
  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  // =============================================================================
  // HELPER FUNCTIONS
  // =============================================================================

  // Get all photos
  const getAllPhotos = useCallback((): Photo[] => {
    return photos;
  }, [photos]);

  // Get photos by category with optional limit
  const getPhotosByCategory = useCallback((category: string, limit?: number): Photo[] => {
    const filtered = photos.filter((p) => p.category === category);
    if (limit && limit > 0) {
      return filtered.slice(0, limit);
    }
    return filtered;
  }, [photos]);

  // Get a random photo, optionally from a specific category
  const getRandomPhoto = useCallback((category?: string): Photo | null => {
    const pool = category
      ? photos.filter((p) => p.category === category)
      : photos;

    if (pool.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
  }, [photos]);

  // Get photo by ID
  const getPhotoById = useCallback((id: string): Photo | null => {
    return photos.find((p) => p.id === id) || null;
  }, [photos]);

  // Get all categories
  const getCategories = useCallback((): string[] => {
    return categories;
  }, [categories]);

  // =============================================================================
  // ADVANCED UI HELPERS
  // =============================================================================

  // Get a hero-appropriate photo (prefers landscape, high-res)
  const getHeroPhoto = useCallback((category?: string): Photo | null => {
    const pool = category
      ? photos.filter((p) => p.category === category)
      : photos;

    // Prefer landscape photos for heroes (aspect ratio > 1.3)
    const landscapePhotos = pool.filter((p) => p.aspectRatio > 1.3);
    const sourcePool = landscapePhotos.length > 0 ? landscapePhotos : pool;

    if (sourcePool.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * sourcePool.length);
    return sourcePool[randomIndex];
  }, [photos]);

  // Get multiple photos for cards (shuffled)
  const getCardPhotos = useCallback((category: string, count: number): Photo[] => {
    const categoryPhotos = photos.filter((p) => p.category === category);

    // Shuffle and take requested count
    const shuffled = [...categoryPhotos].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }, [photos]);

  // Get a background-appropriate photo
  const getBackgroundPhoto = useCallback((category?: string, preferLandscape = true): Photo | null => {
    const pool = category
      ? photos.filter((p) => p.category === category)
      : photos;

    if (preferLandscape) {
      const landscapePhotos = pool.filter((p) => p.aspectRatio > 1.5);
      if (landscapePhotos.length > 0) {
        const randomIndex = Math.floor(Math.random() * landscapePhotos.length);
        return landscapePhotos[randomIndex];
      }
    }

    if (pool.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
  }, [photos]);

  // =============================================================================
  // CONTEXT VALUE
  // =============================================================================
  const contextValue = useMemo<PhotoContextState>(() => ({
    // State
    photos,
    categories,
    isLoading,
    error,
    isReady: !isLoading && !error && photos.length > 0,

    // Basic helpers
    getRandomPhoto,
    getPhotosByCategory,
    getAllPhotos,
    getPhotoById,
    getCategories,

    // Advanced UI helpers
    getHeroPhoto,
    getCardPhotos,
    getBackgroundPhoto,

    // Utilities
    getFullUrl,
    refetch: fetchPhotos,
  }), [
    photos,
    categories,
    isLoading,
    error,
    getRandomPhoto,
    getPhotosByCategory,
    getAllPhotos,
    getPhotoById,
    getCategories,
    getHeroPhoto,
    getCardPhotos,
    getBackgroundPhoto,
    getFullUrl,
    fetchPhotos,
  ]);

  return (
    <PhotoContext.Provider value={contextValue}>
      {children}
    </PhotoContext.Provider>
  );
}

// =============================================================================
// HOOK
// =============================================================================
export function useCoastlinePhotos(): PhotoContextState {
  const context = useContext(PhotoContext);

  if (!context) {
    throw new Error(
      "useCoastlinePhotos must be used within a PhotoProvider. " +
      "Make sure to wrap your app with <PhotoProvider>."
    );
  }

  return context;
}

// =============================================================================
// UTILITY HOOK: Use a specific photo with loading state
// =============================================================================
interface UsePhotoResult {
  photo: Photo | null;
  isLoading: boolean;
  error: string | null;
}

export function usePhoto(category?: string): UsePhotoResult {
  const { getRandomPhoto, isLoading, error } = useCoastlinePhotos();

  // Memoize the photo selection so it doesn't change on every render
  const photo = useMemo(() => {
    return getRandomPhoto(category);
  }, [getRandomPhoto, category]);

  return { photo, isLoading, error };
}

// =============================================================================
// UTILITY HOOK: Use multiple photos
// =============================================================================
interface UsePhotosResult {
  photos: Photo[];
  isLoading: boolean;
  error: string | null;
}

export function usePhotos(category: string, limit?: number): UsePhotosResult {
  const { getPhotosByCategory, isLoading, error } = useCoastlinePhotos();

  const photos = useMemo(() => {
    return getPhotosByCategory(category, limit);
  }, [getPhotosByCategory, category, limit]);

  return { photos, isLoading, error };
}

// =============================================================================
// DEFAULT EXPORT
// =============================================================================
export default PhotoProvider;
