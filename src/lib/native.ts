// Build-safe native (Capacitor) helpers. Everything degrades to a no-op on the
// web: the plugins are imported lazily and only used when running inside the
// native app, so the web bundle and SSR are unaffected. Used by the iOS wrapper
// (see APP_STORE.md) to add real native value (camera, push) on top of the site.

/** True only when running inside the Capacitor native shell (never on the web). */
export function isNativeApp(): boolean {
  if (typeof window === 'undefined') return false;
  const cap = (window as unknown as { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor;
  return Boolean(cap?.isNativePlatform?.());
}

/**
 * Take a photo with the device camera and return it as a File ready to upload
 * (same shape the listing/verification upload flows already use). Returns null
 * if cancelled or unavailable. On native it opens the real camera; elsewhere the
 * caller should keep using the normal <input type="file"> path.
 */
export async function takePhotoAsFile(): Promise<File | null> {
  try {
    const { Camera, CameraResultType, CameraSource } = await import('@capacitor/camera');
    const photo = await Camera.getPhoto({ quality: 80, resultType: CameraResultType.Uri, source: CameraSource.Prompt });
    if (!photo.webPath) return null;
    const res = await fetch(photo.webPath);
    const blob = await res.blob();
    const ext = photo.format || 'jpg';
    return new File([blob], `photo-${Date.now()}.${ext}`, { type: blob.type || 'image/jpeg' });
  } catch {
    return null;
  }
}

/**
 * Register for push notifications (native only). Passes the device token to
 * `onToken` so the caller can store it server-side for sending. Requires APNs
 * setup in Xcode/App Store Connect to actually deliver — see APP_STORE.md §6b.
 */
export async function registerPush(onToken?: (token: string) => void): Promise<void> {
  if (!isNativeApp()) return;
  try {
    const { PushNotifications } = await import('@capacitor/push-notifications');
    let perm = await PushNotifications.checkPermissions();
    if (perm.receive === 'prompt') perm = await PushNotifications.requestPermissions();
    if (perm.receive !== 'granted') return;
    await PushNotifications.addListener('registration', (t) => onToken?.(t.value));
    await PushNotifications.register();
  } catch {
    /* ignore — push simply stays off */
  }
}
