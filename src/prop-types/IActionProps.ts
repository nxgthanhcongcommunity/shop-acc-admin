export default interface IActionProps<T> {
  record: T | null;
  action: "update" | "delete" | "create";
}
