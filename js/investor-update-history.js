document.addEventListener("DOMContentLoaded", function () {
    const downloadButtons = document.querySelectorAll(".download-button");

    downloadButtons.forEach(button => {
        button.addEventListener("click", function () {
            const filename = this.getAttribute("data-filename");

            // Update with your actual WindowsApp server URL
            const fileUrl = `https://your-windowsapp-server.com/investor-updates/${filename}`;

            fetch(fileUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/pdf"
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("File not found");
                }
                return response.blob();
            })
            .then(blob => {
                const link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(error => {
                console.error("Download failed:", error);
                alert("Error: Unable to download file.");
            });
        });
    });
});
