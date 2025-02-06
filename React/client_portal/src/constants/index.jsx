import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";


export const navItems = [
  { label: "Features", href: "#" }
];


import { FileLock, EyeOff, FileCheck, Scan, Users, DatabaseZap } from "lucide-react";

export const features = [
  {
    icon: <FileLock />,
    text: "Zero-Knowledge Proofs (ZKPs)",
    description:
      "Verify file ownership and authenticity without revealing the actual document contents, ensuring privacy and security.",
  },
  {
    icon: <EyeOff />,
    text: "Secure File Sharing",
    description:
      "Users can request access to files using their DID, and file owners can grant access via cryptographic proofs.",
  },
  {
    icon: <FileCheck />,
    text: "Decentralized Storage",
    description:
      "Files are securely stored using decentralized storage solutions, reducing the risk of tampering or data loss.",
  },
  {
    icon: <Scan />,
    text: "OCR-Based Hard Copy Verification",
    description:
      "Scan physical documents and verify their authenticity using OCR and cryptographic checks.",
  },
  {
    icon: <Users />,
    text: "Government Employee Portal",
    description:
      "Government employees can upload official documents directly to users' DIDs for secure and verified storage.",
  },
  {
    icon: <DatabaseZap />,
    text: "Client Portal for Access & Requests",
    description:
      "Users can view their own documents, search others by DID, and request access to shared files securely.",
  },
];

export const checklistItems = [
  {
    title: "Zero-Knowledge File Verification",
    description:
      "Ensure file authenticity and ownership without exposing sensitive data.",
  },
  {
    title: "Controlled Access via DID Requests",
    description:
      "Users must request access to view files, maintaining privacy and security.",
  },
  {
    title: "OCR-Enabled Hard Copy Validation",
    description:
      "Verify physical documents through OCR and blockchain-based records.",
  },
  {
    title: "Decentralized & Tamper-Proof Storage",
    description:
      "Store documents in a secure, censorship-resistant decentralized network.",
  },
];


export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];
