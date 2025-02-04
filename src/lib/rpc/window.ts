import { toastStore } from "$lib/stores/ToastStore";
import { invoke } from "@tauri-apps/api/tauri";
import { exceptionLog } from "./logging";

export async function openDir(directory: string): Promise<void> {
  try {
    return await invoke("open_dir_in_os", { directory });
  } catch (e) {
    exceptionLog(`Unable to open directory - ${directory}`, e);
    toastStore.makeToast("Unable to open directory", "error");
  }
}

export async function openMainWindow(): Promise<boolean> {
  try {
    invoke("open_main_window");
    return true;
  } catch (e) {
    exceptionLog(
      "Unexpected error encountered when attempting to open the main window",
      e
    );
  }
  return false;
}
