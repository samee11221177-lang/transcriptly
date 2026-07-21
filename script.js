// Elements

const transcriptOutput = document.getElementById("transcriptOutput");
const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");

// Copy Transcript

copyBtn.addEventListener("click", () => {

navigator.clipboard.writeText(transcriptOutput.value);

copyBtn.innerText = "✅ Copied!";

setTimeout(() => {

copyBtn.innerText = "📋 Copy";

},2000);

});

// Download TXT

downloadBtn.addEventListener("click", () => {

const text = transcriptOutput.value;

const blob = new Blob([text], {type:"text/plain"});

const link = document.createElement("a");

link.href = URL.createObjectURL(blob);

link.download = "transcript.txt";

link.click();

});