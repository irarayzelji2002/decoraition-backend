document.addEventListener("DOMContentLoaded", function () {
	const brushSizeInput = document.getElementById("brush_size");
	const selectedColorInput = document.getElementById("selected_color");
	const opacityInput = document.getElementById("selected_opacity");
	const canvas = document.getElementById("drawing_canvas");
	const context = canvas.getContext("2d");

	let brushSize = brushSizeInput.value;
	let selectedColor = selectedColorInput.value;
	let selectedOpacity = opacityInput.value;
	let drawing = false;

	let originalImage = null;
	let strokes = []; // Array to hold all strokes

	// Handle image upload
	const initImage = document.getElementById("init_image");
	initImage.addEventListener("change", function (event) {
		const file = event.target.files[0];
		const reader = new FileReader();

		reader.onload = function (e) {
			const img = new Image();
			img.src = e.target.result;
			img.onload = function () {
				canvas.width = img.width;
				canvas.height = img.height;
				context.drawImage(img, 0, 0);
				originalImage = img; // Store the original image
			};
		};

		reader.readAsDataURL(file);
	});

	// Brush size, opacity, and color changes
	brushSizeInput.addEventListener("input", function () {
		brushSize = brushSizeInput.value;
	});

	opacityInput.addEventListener("input", function () {
		selectedOpacity = opacityInput.value;
		redrawCanvas();
	});

	selectedColorInput.addEventListener("input", function () {
		selectedColor = selectedColorInput.value;
		redrawCanvas(); // Redraw canvas with updated color
	});

	// Drawing logic
	canvas.addEventListener("mousedown", function (event) {
		drawing = true;
		draw(event);
	});

	canvas.addEventListener("mousemove", function (event) {
		if (drawing) {
			draw(event);
		}
	});

	canvas.addEventListener("mouseup", function () {
		drawing = false;
	});

	canvas.addEventListener("mouseout", function () {
		drawing = false;
	});

	function draw(event) {
		const rect = canvas.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		// Save the stroke details
		strokes.push({
			x: x,
			y: y,
			size: brushSize,
			color: selectedColor,
			opacity: 1,
		});

		// Draw on the canvas with the current opacity
		context.globalAlpha = 1;
		context.fillStyle = selectedColor; // Use the current brush color
		context.beginPath();
		context.arc(x, y, brushSize / 2, 0, 2 * Math.PI);
		context.fill();
	}

	function redrawCanvas() {
		// Clear the canvas and redraw the original image
		context.clearRect(0, 0, canvas.width, canvas.height);
		if (originalImage) {
			context.drawImage(originalImage, 0, 0); // Redraw the original image
		}

		// Redraw the strokes with the current color and opacity
		strokes.forEach(function (stroke) {
			context.globalAlpha = selectedOpacity; // Use the stroke's saved opacity
			context.fillStyle = selectedColor; // Use the stroke's saved color
			context.beginPath();
			context.arc(stroke.x, stroke.y, stroke.size / 2, 0, 2 * Math.PI);
			context.fill();
		});

		context.globalAlpha = 1; // Reset global alpha to 1 after drawing
	}

	// Clear canvas
	document
		.getElementById("clear_canvas")
		.addEventListener("click", function () {
			context.clearRect(0, 0, canvas.width, canvas.height);
			strokes = []; // Clear the strokes array
			if (originalImage) {
				context.drawImage(originalImage, 0, 0); // Redraw the original image
			}
		});

	// Convert to base64 black-and-white image (not changed)
	function user_mask_to_base64_black_and_white() {
		const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
		const bwCanvas = document.createElement("canvas");
		const bwContext = bwCanvas.getContext("2d");
		bwCanvas.width = imgData.width;
		bwCanvas.height = imgData.height;

		const bwImageData = bwContext.createImageData(
			imgData.width,
			imgData.height
		);

		for (let i = 0; i < imgData.data.length; i += 4) {
			const r = imgData.data[i];
			const g = imgData.data[i + 1];
			const b = imgData.data[i + 2];
			const alpha = imgData.data[i + 3];

			const isColored = alpha > 0; // Any non-transparent area is considered selected
			const colorValue = isColored ? 255 : 0; // White for selected, black for the rest

			bwImageData.data[i] = colorValue;
			bwImageData.data[i + 1] = colorValue;
			bwImageData.data[i + 2] = colorValue;
			bwImageData.data[i + 3] = 255; // Fully opaque
		}

		bwContext.putImageData(bwImageData, 0, 0);

		// Get base64
		const base64Image = bwCanvas.toDataURL();
		document.getElementById("user_mask_base64_output").value = base64Image;
	}
});
