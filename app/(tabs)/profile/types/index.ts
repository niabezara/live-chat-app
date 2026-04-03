export type Status = "online" | "away" | "busy" | "offline";

export interface StatusOption {
  value: Status;
  label: string;
  color: string;
}
