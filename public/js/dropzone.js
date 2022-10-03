Dropzone.autoDiscover = false;

let myDropzone = new Dropzone("#my-dropzone", {
  paramName: "myfile", // The name that will be used to transfer the file
  maxFilesize: 1, // MB
  maxFiles: 2,
  dictDefaultMessage: "Click or drop files here to upload",
  addRemoveLinks: false,
  previewsContainer: "#previews",
  createImageThumbnails: false,
  previewTemplate: document.querySelector("#tmp").innerHTML,

  sending: (file, xhr, formData) => {
    formData.append("uuid", file.upload.uuid);
  },

  removedfile: async file => {
    // Delete preview
    if (file.previewElement != null && file.previewElement.parentNode != null) {
      file.previewElement.parentNode.removeChild(file.previewElement);
    }
    const res = await fetch("/deleteFile", {
      method: "delete",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        uuid: file.upload.uuid,
        filename: file.upload.filename,
      }),
    });
  },

  success: (file, response) => {
    // console.log(file.previewElement);
    // console.log(file);
    // console.log(response);
    const previewGroup = file.previewElement;
    previewGroup.dataset.id = file.upload.uuid;

    previewGroup.querySelector(".fileinfo").innerHTML = response.link;

    const jpegDiv = previewGroup.querySelector('[data-ext="jpeg"]');
    const webpDiv = previewGroup.querySelector('[data-ext="webp"]');

    const refsJpeg = {
      newSize: jpegDiv.querySelector(".newSize"),
      newQuality: jpegDiv.querySelector(".newQuality"),
      downloadJpeg: jpegDiv.querySelector(".downloadJpeg"),
      dialog: jpegDiv.querySelector("dialog"),
      openDialogBtn: jpegDiv.querySelector(".compare"),
      changeQualityForm: jpegDiv.querySelector(".changeQuality"),
      saveDialogBtn: jpegDiv.querySelector(".save"),
      closeDialogBtn: jpegDiv.querySelector(".close"),
      img2: jpegDiv.querySelector("[data-img2]"),
    };

    const refsWebp = {
      newSize: webpDiv.querySelector(".newSize"),
      newQuality: webpDiv.querySelector(".newQuality"),
      downloadWebp: webpDiv.querySelector(".downloadWebp"),
      dialog: webpDiv.querySelector("dialog"),
      openDialogBtn: webpDiv.querySelector(".compare"),
      changeQualityForm: webpDiv.querySelector(".changeQuality"),
      saveDialogBtn: webpDiv.querySelector(".save"),
      closeDialogBtn: webpDiv.querySelector(".close"),
      img2: webpDiv.querySelector("[data-img2]"),
    };

    const inputJpegQuality = refsJpeg.changeQualityForm.querySelector("input");
    const inputWebpQuality = refsWebp.changeQualityForm.querySelector("input");

    let currentQualityJpeg = response.quality;
    let currentSrcJpeg = response.jpegBase64;
    let currentSizeJpeg = response.newSize;

    let currentQualityWebp = response.quality;
    let currentSrcWebp = response.jpegBase64;
    let currentSizeWebp = response.newSize;

    let qualityFromFormJpeg = response.quality;
    let srcFromFormJpeg = response.jpegBase64;
    let sizeFromFormJpeg = response.newSizel;

    let qualityFromFormWebp = response.quality;
    let srcFromFormWebp = response.jpegBase64;
    let sizeFromFormWebp = response.newSizel;

    refsJpeg.closeDialogBtn.addEventListener("click", () => {
      refsJpeg.dialog.returnValue = "";
      refsJpeg.dialog.close();
    });

    refsWebp.closeDialogBtn.addEventListener("click", () => {
      refsWebp.dialog.returnValue = "";
      refsWebp.dialog.close();
    });

    refsJpeg.openDialogBtn.addEventListener("click", () => {
      refsJpeg.dialog.showModal();
    });

    refsWebp.openDialogBtn.addEventListener("click", () => {
      refsWebp.dialog.showModal();
    });

    refsJpeg.saveDialogBtn.addEventListener("click", () => {
      refsJpeg.dialog.returnValue = "saved";
      refsJpeg.dialog.close();
      currentQualityJpeg = qualityFromFormJpeg;
      currentSrcJpeg = srcFromFormJpeg;
      currentSizeJpeg = sizeFromFormJpeg;
      refsJpeg.newSize.innerHTML = (currentSizeJpeg / 1024).toFixed(2) + " Kb";
      refsJpeg.newQuality.innerHTML = `${currentQualityJpeg} %`;
      refsJpeg.downloadJpeg.href = currentSrcJpeg;
    });

    refsWebp.saveDialogBtn.addEventListener("click", () => {
      refsWebp.dialog.returnValue = "saved";
      refsWebp.dialog.close();
      currentQualityWebp = qualityFromFormWebp;
      currentSrcWebp = srcFromFormWebp;
      currentSizeWebp = sizeFromFormWebp;
      refsWebp.newSize.innerHTML = (currentSizeWebp / 1024).toFixed(2) + " Kb";
      refsWebp.newQuality.innerHTML = `${currentQualityWebp} %`;
      refsWebp.downloadWebp.href = currentSrcWebp;
    });

    refsJpeg.dialog.addEventListener("close", () => {
      refsJpeg.img2.src = currentSrcJpeg;
      inputJpegQuality.value = currentQualityJpeg;
    });

    refsWebp.dialog.addEventListener("close", () => {
      refsWebp.img2.src = currentSrcWebp;
      inputWebpQuality.value = currentQualityWebp;
    });

    refsJpeg.changeQualityForm.addEventListener("submit", async e => {
      e.preventDefault();

      const res = await fetch("/jpeg", {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          filename: response.filename,
          quality: inputJpegQuality.value,
        }),
      });
      const data = await res.json();

      qualityFromFormJpeg = data.quality;
      srcFromFormJpeg = data.jpegBase64;
      sizeFromFormJpeg = data.jpegInfo.size;
      refsJpeg.img2.src = data.jpegBase64;
    });

    refsWebp.changeQualityForm.addEventListener("submit", async e => {
      e.preventDefault();

      const res = await fetch("/webp", {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          filename: response.filename,
          quality: inputWebpQuality.value,
        }),
      });
      const data = await res.json();

      qualityFromFormWebp = data.quality;
      srcFromFormWebp = data.webpBase64;
      sizeFromFormWebp = data.webpInfo.size;
      refsWebp.img2.src = data.webpBase64;
    });
  },
});
