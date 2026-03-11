import threading
import time
import sys


# ============================================
# TERMINAL SPINNER
# ============================================

class Spinner:
    def __init__(self, message="Generating"):
        self.spinner = ['|', '/', '-', '\\']
        self.running = False
        self.thread = None
        self.message = message

    def spin(self):
        i = 0
        while self.running:
            sys.stdout.write(
                f"\r{self.message} {self.spinner[i % len(self.spinner)]}"
            )
            sys.stdout.flush()
            time.sleep(0.1)
            i += 1

    def start(self):
        self.running = True
        self.thread = threading.Thread(target=self.spin, daemon=True)
        self.thread.start()

    def stop(self):
        self.running = False
        if self.thread:
            self.thread.join()
        sys.stdout.write("\r" + " " * 40 + "\r")
        sys.stdout.flush()