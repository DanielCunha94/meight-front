export function getCurrentRoute() {
  return window.location.pathname.split("/")?.[1] ?? "/";
}
