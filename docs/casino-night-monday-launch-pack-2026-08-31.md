# Casino Night — Monday Launch Pack

**Date:** Monday, August 31, 2026  
**Purpose:** Put the smallest decision set in front of Scott so the Save the Date, staffing appeal, vendor logistics, and committee onboarding can move without creating compliance or payment risk.

## Monday outcome

By noon, aim to have these five decisions made or explicitly assigned:

1. **Save the Date release:** approve audience, sender, and the working ticket/donation/volunteer/sponsor paths.
2. **Pricing rollout:** confirm the four price points and choose ticket allotments by tier.
3. **Vendor administration:** assign invoice/PO handling and request the vendor's exact legal entity plus final logistics.
4. **Staffing appeal:** name the authorized labor/HR reviewer, confirm the release path, and protect the September 1 deadline.
5. **Committee access:** bootstrap Scott as owner, then invite a small pilot group as editors/viewers before enforcing sign-in for everyone.

## What moved overnight

- Built and tested an invitation-only committee access system with **owner, editor, and viewer** roles.
- Added single-use, expiring invitations; 14-day secure sessions; CSRF and origin checks; owner-only access administration; orientation completion; suspension/session revocation; and last-owner protection.
- Added a two-minute committee orientation that tells members how to follow the next move, leave an attributable trail, and keep confidential data out of the workspace.
- Replaced client-supplied activity attribution on browser mutations with the signed-in server principal when authentication is enforced.
- Added a persistent, separate authentication database on the Render disk so the existing 66 planning records and activity history are untouched.
- Completed local verification: 19 tests passed, production build passed, mobile access screen reviewed at 390 px with no reject-level defect.

## Monday decision queue

### 1. Release Casino Night Save the Date — due August 31

**Ready:** copy package exists.  
**Blocked by:** approved audience, sender, and working conversion links.  
**Decision:** identify the approver and verify every destination before distribution. Do not release a QR code or link that lands on an unfinished path.

### 2. Place Casino Night on leadership calendars — due August 31

**Owner:** Kate / executive assistants.  
**Blocked by:** exact calendar owners and distribution method.  
**Decision:** calendar hold first; formal trustee invitation remains a separate Mary Grady protocol item.

### 3. Finalize pricing and tier allotments

The committee has expressed support for:

- **$50 — First 50:** limited early-access offer.
- **$65 — Advance GA:** primary presale tier.
- **$75 — Late / door:** market-aligned late price.
- **$100 — Mission Patron:** event admission plus a philanthropic premium.

**Open decision:** number of tickets assigned to the final three tiers. Do not repeat the prior illustrative gross as final until the allotments, catering/bar costs, underwriting, and fair-market-value review are locked.

**New opportunity:** Leighia offered to sponsor an employee ticket raffle. Treat this as promising but not cleared; confirm the employee communications channel and applicable promotion/raffle rules before announcement.

### 4. Casino vendor contract, invoice, and logistics

**Confirmed:** agreement completed; gaming package is $5,760 for 13 tables and 15 dealers/facilitators.  
**New inbox item:** invoice #215799 for $1,440 is waiting.  
**Do not pay from this packet.** Route through the authorized invoice/PO path and verify the invoice against the signed agreement.

**Still needed:**

- vendor's exact legal entity;
- arrival and dealer times;
- table/chair count;
- certificate-of-insurance wording and any charge;
- campus access, load-in, breakdown, and weekend pickup plan.

### 5. September 1 event-assistance appeal

**Ready:** role-based staffing matrix and manager guidance are drafted.  
**Blocked by:** authorized labor/HR wording review, confirmed shift windows, signup readiness, and overtime/comp-time guidance.  
**Decision:** name the authorized reviewer Monday morning and set a same-day go/no-go deadline. Do not promise overtime, comp time, or schedule changes.

## First 90 minutes

1. **15 min:** approve the five-item decision queue and assign one owner to each unassigned operational action.
2. **15 min:** verify the Save the Date's four conversion destinations.
3. **15 min:** choose ticket allotments or assign the final revenue model with a hard deadline.
4. **15 min:** route invoice #215799 and the signed agreement to the authorized payment/PO owner.
5. **15 min:** send the already-prepared vendor logistics request after review.
6. **15 min:** identify the labor/HR reviewer and approve or hold the September 1 staffing appeal.

## Protected personal appointment

- **American Fidelity dependent-verification appointment:** Monday, August 31, 4:15–5:00 PM PT, virtual.
- Use a computer/laptop/tablet with internet access.
- Have required dependent eligibility documents available; upload only through the secure link provided during the appointment.

## Committee access rollout

### Pilot first

1. Configure the private production bootstrap credential in Render.
2. Create Scott's one-time owner invitation and complete orientation.
3. Invite **2–4 pilot members**:
   - editor for people maintaining actions and evidence;
   - viewer for people who only need visibility;
   - owner only for a true access administrator.
4. Confirm sign-in, read, edit, attribution, suspension, and mobile usability.
5. Change `CASINO_PLANNING_AUTH_MODE` from `observe` to `enforced` only after the owner account and pilot access are verified.

### Role boundaries

- **Owner:** access administration, invitations, role/status changes, all board edits, archival actions.
- **Editor:** read and update operational planning records; cannot manage access or archive records.
- **Viewer:** read-only board access and exports.

### Data boundary

This workspace is for operational event planning. Keep donor, payment, student, personnel, benefits, and other confidential records out until a formally approved data policy and stronger institutional identity controls are added.

## Do not do automatically

- Do not send committee, trustee, staffing, vendor, or calendar communications without Scott's review.
- Do not pay the casino invoice or make contract commitments.
- Do not announce the employee ticket raffle before policy review.
- Do not switch authentication to enforced mode before Scott's owner account is verified.
- Do not expose tokens or one-time invitation links in screenshots, QR codes, source control, or summaries.
