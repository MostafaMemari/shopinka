export function unwrap<T>(res: { success: true; data: T } | { success: false; status: number; message: string }): T {
  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data;
}
