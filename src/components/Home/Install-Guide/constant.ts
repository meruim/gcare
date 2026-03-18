import { InstallStep } from "./types";
import tapDownload from "@/assets/img/install-guide/tap_download.webp";
import openDownload from "@/assets/img/install-guide/open_download.webp";
import installUnknownSource from "@/assets/img/install-guide/install_unkown_sources.webp";
import install from "@/assets/img/install-guide/install.webp";
import getStarted from "@/assets/img/install-guide/get_started.webp";

export const INSTALL_STEPS: InstallStep[] = [
  {
    id: 1,
    title: "Download the App",
    instructions: [
      'Click "Download" on the official website',
      "Open the downloaded file",
    ],
    images: [tapDownload, openDownload],
  },
  {
    id: 2,
    title: "Allow Installation",
    description: "Skip this step if you've already done it",
    instructions: [
      'When prompted, tap "Settings"',
      'Turn on "Allow from this source"',
      "Go back to continue the installation",
    ],
    images: [installUnknownSource],
  },
  {
    id: 3,
    title: "Install",
    instructions: ['Tap "Install"', 'Then tap "Open"'],
    images: [install],
  },
  {
    id: 4,
    title: "Start Using the App",
    instructions: [
      "Sign in with your JRMSU Student ID Number",
      "Enjoy using the app!",
    ],
    images: [getStarted],
  },
];
