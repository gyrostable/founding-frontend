export default interface NotificationData {
  message?: string | string[];
  title?: string;
  copy?: string;
  child?: React.ReactNode;
}
