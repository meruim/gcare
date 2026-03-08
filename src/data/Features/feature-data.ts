import { Clock, QrCode, BellRing, MessageSquare } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureData: Feature[] = [
  {
    icon: Clock,
    title: "Real-time Appointment Tracking",
    description:
      "Monitor and update appointments in real time to ensure efficient scheduling and minimal delays.",
  },
  {
    icon: QrCode,
    title: "QR Code-Based Check-ins",
    description:
      "Enable seamless appointment verification and attendance through quick QR code scanning.",
  },
  {
    icon: BellRing,
    title: "Automated Reminders",
    description:
      "Automatically send reminders and notifications to reduce missed appointments and improve engagement.",
  },
  {
    icon: MessageSquare,
    title: "Feedback Redirection",
    description:
      "Collect and redirect feedback efficiently to counselors or staff for continuous improvement.",
  },
];

export default FeatureData;
