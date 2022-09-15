Dropzone.autoDiscover = false;

let myDropzone = new Dropzone("#my-dropzone", {
  paramName: "myfile", // The name that will be used to transfer the file
  maxFilesize: 1, // MB
  dictDefaultMessage: "Click or drop files here to upload",
  addRemoveLinks: true,
  previewsContainer: "#previews",
  createImageThumbnails: false,
  previewTemplate: document.querySelector("#tmp").innerHTML,

  sending: (file, xhr, formData) => {
    formData.append("uuid", file.upload.uuid);
  },

  success: (file, response) => {
    console.log(file.previewElement);
    console.log(file);
    console.log(response);
    const previewElement = file.previewElement;
    previewElement.dataset.id = file.upload.uuid;

    previewElement.insertAdjacentHTML("beforeend", response.link);

    // const comparisonsDiv = document.querySelector("#comparisons");
    // comparisonsDiv.insertAdjacentHTML("beforeend", response.html);
    // const sliderContainer = comparisonsDiv.querySelector(
    //   `[data-id="${response.src}"]`
    // );
    // const form = sliderContainer.querySelector("form");
    // form.addEventListener("submit", async e => {
    //   e.preventDefault();
    //   const inp = form.querySelector("input");
    //   const res = await fetch("/optimize", {
    //     method: "post",
    //     headers: { "Content-type": "application/json" },
    //     body: JSON.stringify({
    //       dataId: sliderContainer.dataset.id,
    //       quality: inp.value,
    //     }),
    //   });
    //   const data = await res.json();
    //   console.log(data);
    //   sliderContainer.querySelector("[data-img2").src = data.jpegBase64;
    //   sliderContainer.querySelector("[data-newSizeJpeg]").innerHTML = (
    //     data.jpegInfo.size / 1024
    //   ).toFixed(2);
    //   sliderContainer.querySelector("[data-newSizeWebp]").innerHTML = (
    //     data.webpInfo.size / 1024
    //   ).toFixed(2);
    //   sliderContainer.querySelector("[data-downloadJpeg]").href =
    //     data.jpegBase64;
    //   sliderContainer.querySelector("[data-downloadWebp]").href =
    //     data.webpBase64;
    // });
  },
});
