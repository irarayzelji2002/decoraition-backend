document.addEventListener("DOMContentLoaded", function () {
	const brushSizeInput = document.getElementById("brush_size");
	const selectedColorInput = document.getElementById("selected_color");
	const opacityInput = document.getElementById("selected_opacity");
	const brushModeCheckbox = document.getElementById("selected_brush_mode");
	const canvas = document.getElementById("drawing_canvas");
	const context = canvas.getContext("2d");
	const brushModeDescription = document.getElementById(
		"selected_brush_mode_desc"
	);

	let brushSize = brushSizeInput.value;
	let selectedColor = selectedColorInput.value;
	let selectedOpacity = opacityInput.value;
	let drawing = false;

	let originalImage = null;
	let path = new Path2D(); // For drawn areas
	let erasedPath = new Path2D(); // For erased areas
	let erasedRegions = []; // Store erased regions
	let hasDrawnPath = false;
	let needsRedraw = false; // To flag when a redraw is necessary

	// Handle image upload
	const initImagePreview = document.getElementById("init_image_preview");
	const initImage = document.getElementById("init_image");
	const userMaskCanvas = document.getElementById("user_mask_canvas");
	initImage.addEventListener("change", function (event) {
		const file = event.target.files[0];
		const reader = new FileReader();

		reader.onload = function (e) {
			const img = new Image();
			img.src = e.target.result;
			img.onload = function () {
				let img_width = img.width;
				let img_height = img.height;
				userMaskCanvas.width = img_width;
				userMaskCanvas.height = img_height;
				canvas.width = img_width;
				canvas.height = img_height;
				initImagePreview.width = img_width;
				initImagePreview.height = img_height;
				initImagePreview.src = img.src;
				originalImage = img; // Store the original image
				// context.drawImage(originalImage, 0, 0); // Draw the image on the canvas
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
		redrawCanvas(); // Redraw canvas with updated opacity
	});

	selectedColorInput.addEventListener("input", function () {
		selectedColor = selectedColorInput.value;
		redrawCanvas(); // Redraw canvas with updated color
	});

	// Brush Mode Checkbox Logic
	brushModeCheckbox.addEventListener("change", function () {
		if (brushModeCheckbox.checked) {
			brushModeDescription.textContent = "Draw"; // Update mode description
			selectedColor = selectedColorInput.value; // Restore original color
		} else {
			brushModeDescription.textContent = "Erase"; // Update mode description
		}
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
		if (needsRedraw) {
			redrawCanvas();
			needsRedraw = false; // Reset after redraw
		}
	});

	canvas.addEventListener("mouseout", function () {
		drawing = false;
		if (needsRedraw) {
			redrawCanvas();
			needsRedraw = false; // Reset after redraw
		}
	});

	function draw(event) {
		const rect = canvas.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		// Create a circle path at the current position with the current brush size
		const strokePath = new Path2D();
		strokePath.arc(x, y, brushSize / 2, 0, 2 * Math.PI);

		if (brushModeCheckbox.checked) {
			// Drawing mode
			let isErased = false;

			// Check if the current stroke (with brush size) overlaps any erased region
			for (let i = 0; i < erasedRegions.length; i++) {
				const erasedRegion = erasedRegions[i];
				// Check a few points along the stroke's arc to detect overlap
				const checkPoints = getBrushArcPoints(x, y, brushSize / 2);
				for (const point of checkPoints) {
					if (context.isPointInPath(erasedRegion, point.x, point.y)) {
						isErased = true;
						erasedRegions.splice(i, 1); // Remove the erased region
						break;
					}
				}
				if (isErased) break;
			}

			// If there was overlap with erased region, remove that part from erased path
			if (isErased) {
				rebuildErasedPath(); // Rebuild the erased path without the overlapping region
			}

			// Add the stroke to the drawn path
			path.addPath(strokePath);
			hasDrawnPath = true;
			context.globalAlpha = 1; // Fully opaque while drawing
			context.fillStyle = selectedColor; // Use the current brush color
			context.fill(strokePath); // Draw the stroke
		} else {
			// Erasing mode
			if (hasDrawnPath) {
				erasedRegions.push(strokePath); // Add erased region

				// Directly render the erasing stroke for real-time feedback
				context.globalCompositeOperation = "destination-out";
				context.globalAlpha = 1;
				context.fill(strokePath); // Erase the stroke on the canvas
				context.globalCompositeOperation = "source-over"; // Reset composite operation

				// Rebuild the erased path after stroke
				rebuildErasedPath();
			}
		}

		// Mark that the canvas needs to be redrawn
		needsRedraw = true;
	}

	// Helper function to get points along the arc of a stroke for overlap detection
	function getBrushArcPoints(centerX, centerY, radius) {
		const points = [];
		const numPoints = 10; // Number of points to sample around the stroke
		for (let i = 0; i < numPoints; i++) {
			const angle = (2 * Math.PI * i) / numPoints;
			const x = centerX + radius * Math.cos(angle);
			const y = centerY + radius * Math.sin(angle);
			points.push({ x, y });
		}
		return points;
	}

	function rebuildErasedPath() {
		// Rebuild erasedPath based on erasedRegions
		erasedPath = new Path2D();
		for (let i = 0; i < erasedRegions.length; i++) {
			erasedPath.addPath(erasedRegions[i]);
		}
	}

	function redrawCanvas() {
		// Clear the canvas
		context.clearRect(0, 0, canvas.width, canvas.height);

		// Redraw the original image
		// if (originalImage) {
		// 	context.drawImage(originalImage, 0, 0);
		// }

		// Set opacity for the drawn path
		context.globalAlpha = selectedOpacity;
		context.fillStyle = selectedColor;
		context.fill(path); // Redraw the combined path

		// Erase the areas in the erasedPath
		context.globalCompositeOperation = "destination-out";
		context.globalAlpha = 1;
		context.fill(erasedPath); // Apply erasing
		context.globalCompositeOperation = "source-over"; // Reset to default
	}

	// Clear canvas
	document
		.getElementById("clear_canvas")
		.addEventListener("click", function () {
			context.clearRect(0, 0, canvas.width, canvas.height);
			path = new Path2D(); // Clear the path
			erasedPath = new Path2D(); // Clear the erased path
			erasedRegions = []; // Clear erased regions
			hasDrawnPath = false;
			// if (originalImage) {
			// 	context.drawImage(originalImage, 0, 0); // Redraw the original image
			// }
		});

	// Convert to base64 black-and-white image (not changed)
	document
		.getElementById("get_user_mask")
		.addEventListener("click", function () {
			//userMaskBase64BAW();
			userMaskBase64BAW();
		});
	function getCanvasBase64() {
		// Convert the current canvas content to a base64-encoded string
		const base64Image = canvas.toDataURL("image/png");
		document.getElementById("user_mask_base64_output").value = base64Image;
		return base64Image;
	}

	function userMaskBase64BAW() {
		// Create a new canvas to store black and white image data
		const bwCanvas = document.createElement("canvas");
		const bwContext = bwCanvas.getContext("2d");
		bwCanvas.width = canvas.width;
		bwCanvas.height = canvas.height;

		// Fill the entire canvas with black
		bwContext.fillStyle = "black";
		bwContext.fillRect(0, 0, bwCanvas.width, bwCanvas.height);

		// Get the drawn path from the current canvas context
		const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
		const bwImageData = bwContext.createImageData(
			imgData.width,
			imgData.height
		);

		for (let i = 0; i < imgData.data.length; i += 4) {
			const r = imgData.data[i];
			const g = imgData.data[i + 1];
			const b = imgData.data[i + 2];
			const alpha = imgData.data[i + 3];

			// Check if this pixel is part of a drawn path (non-black and fully opaque)
			const isDrawnPath = alpha > 0 && (r !== 0 || g !== 0 || b !== 0);
			const isErasedPath = alpha === 0; // Alpha 0 represents an erased area

			if (isDrawnPath) {
				// For drawn paths, set the color to white
				bwImageData.data[i] = 255;
				bwImageData.data[i + 1] = 255;
				bwImageData.data[i + 2] = 255;
				bwImageData.data[i + 3] = 255; // Fully opaque
			} else if (isErasedPath) {
				// Erased path - remains black (0), already black so no change needed
				bwImageData.data[i] = 0;
				bwImageData.data[i + 1] = 0;
				bwImageData.data[i + 2] = 0;
				bwImageData.data[i + 3] = 255; // Fully opaque
			} else {
				// Unaffected background - keep it black
				bwImageData.data[i] = 0;
				bwImageData.data[i + 1] = 0;
				bwImageData.data[i + 2] = 0;
				bwImageData.data[i + 3] = 255; // Fully opaque
			}
		}

		// Put the adjusted black and white image data back on the canvas
		bwContext.putImageData(bwImageData, 0, 0);

		// Convert the black-and-white canvas to a base64 string
		const base64Image = bwCanvas.toDataURL();
		document.getElementById("user_mask_base64_output").value = base64Image;
	}
});
