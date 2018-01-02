function getPreview(file) {
    resizeImage(file.files[0]).then(function (cover) {
        var cpreview = document.getElementById("preview-image");
        cpreview.setAttribute('style','background-image: url(\'' + cover + '\'); background-size: contain;');
    });
}

function resizeImage(file) {
	return new Promise(function (a) {
		// Create an image
		var img = document.createElement("img");

		// Create a file reader
		var reader = new FileReader();
		// Set the image once loaded into file reader

		var ready = false;

		reader.onload = function (e) {
			img.src = e.target.result;
			img.onload = function () {

				var canvas = document.createElement("canvas");
				var ctx = canvas.getContext("2d");
				
				ctx.drawImage(img, 0, 0);

				var width = img.width;
				var height = img.height;

				var canvasRatio = 0.75;
				var ratio = img.height / img.width;

				if (ratio < canvasRatio) {
					img.width = width * 600 / height;
					img.height = 600;
				}
				else {
					img.height = height * 800 / width;
					img.width = 800;
				}

				canvas.width = 800;
				canvas.height = 600;

				ctx.drawImage(img,
					400 - img.width / 2,
					300 - img.height / 2,
					img.width,
					img.height
				);

				var dataurl = canvas.toDataURL('image/jpeg', 1.0);
				ready = true;
				a(dataurl);
			}
		}

		reader.readAsDataURL(file);
	})
}