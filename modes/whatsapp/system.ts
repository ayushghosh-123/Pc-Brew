import { exec, spawn } from "node:child_process";
import os from "node:os";
import fs from "node:fs";
import path from "node:path";

export interface SystemCommandResult {
  stdout: string;
  stderr: string;
  exitCode: number;
}

export function executeSystemCommand(command: string, timeoutMs = 45000): Promise<SystemCommandResult> {
  return new Promise((resolve) => {
    const isWindows = process.platform === "win32";
    const shell = isWindows ? "powershell.exe" : "/bin/bash";

    exec(
      command,
      {
        shell,
        timeout: timeoutMs,
        maxBuffer: 1024 * 1024 * 5, // 5MB buffer
        cwd: process.cwd(),
      },
      (error, stdout, stderr) => {
        const exitCode = error ? (typeof error.code === "number" ? error.code : 1) : 0;
        resolve({
          stdout: stdout?.toString() || "",
          stderr: stderr?.toString() || (error && !stdout ? error.message : ""),
          exitCode,
        });
      }
    );
  });
}

export function getSystemInfo(): string {
  const cpus = os.cpus();
  const cpuModel = cpus[0]?.model?.trim() || "Unknown CPU";
  const cpuCores = cpus.length;
  const totalMemGb = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
  const freeMemGb = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
  const usedMemGb = ((os.totalmem() - os.freemem()) / 1024 / 1024 / 1024).toFixed(2);

  const uptimeHours = Math.floor(os.uptime() / 3600);
  const uptimeMinutes = Math.floor((os.uptime() % 3600) / 60);

  let batteryInfo = "N/A";
  if (process.platform === "win32") {
    try {
      const batRaw = require("node:child_process")
        .execSync("powershell -Command \"(Get-CimInstance Win32_Battery).EstimatedChargeRemaining\"", {
          timeout: 4000,
          encoding: "utf-8",
        })
        .trim();
      if (batRaw) {
        batteryInfo = `${batRaw}%`;
      }
    } catch {
      // Ignore battery query error
    }
  }

  return [
    "💻 *Laptop System Information*",
    "",
    `• *Hostname:* ${os.hostname()}`,
    `• *OS:* ${os.type()} ${os.release()} (${os.arch()})`,
    `• *CPU:* ${cpuModel} (${cpuCores} cores)`,
    `• *RAM:* ${usedMemGb} GB used / ${totalMemGb} GB total (${freeMemGb} GB free)`,
    `• *Uptime:* ${uptimeHours}h ${uptimeMinutes}m`,
    `• *Battery:* ${batteryInfo}`,
    `• *Current Dir:* \`${process.cwd()}\``,
    `• *Node/Bun:* Bun ${process.versions.bun || "N/A"} (Node ${process.version})`,
  ].join("\n");
}

export function openLaptopTarget(target: string): { success: boolean; message: string } {
  try {
    const isWindows = process.platform === "win32";
    if (isWindows) {
      spawn("cmd.exe", ["/c", "start", '""', target], {
        detached: true,
        stdio: "ignore",
        shell: false,
      }).unref();
    } else {
      spawn("xdg-open", [target], { detached: true, stdio: "ignore" }).unref();
    }
    return { success: true, message: `Opened: \`${target}\` on laptop screen.` };
  } catch (err: unknown) {
    const errMessage = err instanceof Error ? err.message : String(err);
    return { success: false, message: `Failed to open ${target}: ${errMessage}` };
  }
}

export function listDirectory(targetPath?: string): string {
  try {
    const dir = targetPath ? path.resolve(process.cwd(), targetPath) : process.cwd();
    if (!fs.existsSync(dir)) {
      return ` Directory not found: \`${dir}\``;
    }

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const formatted = entries
      .slice(0, 40)
      .map((entry) => {
        const icon = entry.isDirectory() ? "📁" : "📄";
        return `${icon} ${entry.name}`;
      })
      .join("\n");

    const count = entries.length;
    const header = `📁 *Contents of* \`${dir}\` (${count} items):\n\n`;
    const footer = count > 40 ? `\n\n_...and ${count - 40} more items_` : "";

    return header + formatted + footer;
  } catch (err: unknown) {
    const errMessage = err instanceof Error ? err.message : String(err);
    return `Error listing directory: ${errMessage}`;
  }
}
