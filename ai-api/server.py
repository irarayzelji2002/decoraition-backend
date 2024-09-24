from flask import Flask, request, jsonify, send_file, redirect, url_for, send_from_directory
from flask_cors import CORS
import requests
from PIL import Image
import os
import io
import base64
import uuid
import json
import thecolorapi

app = Flask(__name__)
CORS(app)

# Stable Diffusion WebUI URL
SD_URL = "http://127.0.0.1:7860"

# Directory to store generated images
IMAGES_FOLDER = 'static/images'
if not os.path.exists(IMAGES_FOLDER):
    os.makedirs(IMAGES_FOLDER)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app.config['IMAGES_FOLDER'] = IMAGES_FOLDER

# Color name functions using thecolorapi
def thecolorapi_hex_to_color_name(hex_code):
    try:
        color = thecolorapi.color(hex=hex_code)
        return color.name
    except Exception as e:
        print(f"Error retrieving color name: {e}")
        return hex_code  # Return the original hex code if there's an error

def build_prompt_with_color(base_prompt, color_palette):
    try:
        color_names = [thecolorapi_hex_to_color_name(hex_code) for hex_code in color_palette]
        colors_description = ", ".join(color_names)
        return f"{base_prompt} with colors {colors_description}"
    except Exception as e:
        print(f"Error building prompt with color: {e}")
        return base_prompt  # Fallback to base prompt if there's an error

def generate_image_filename(extension="png"):
    return f"{uuid.uuid4()}.{extension}"

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def validate_first_generation_request(data):
    """Validate the first image generation request."""
    try:
        base_image_loaded = None
        style_reference_loaded = None
        
        if request.content_type.startswith('multipart/form-data'):
            print("Multipart form data detected.")
            # Prompt and number of images
            prompt = data.get('prompt', "").strip()
            number_of_images = int(data.get('number_of_images', 0))
            # Color palette
            color_palette_str = data.get('color_palette', '[]')
            try:
                color_palette = json.loads(color_palette_str)
            except json.JSONDecodeError:
                color_palette = []
            # Base image
            base_image = request.files.get('base_image')
            if base_image and allowed_file(base_image.filename):
                print(f"Base image received.")
                base_image_loaded = Image.open(base_image).convert("RGB")
                print(f"Base image successfully loaded.")
            else:
                print(f"No base image received.")
                base_image = None
            # Style reference
            style_reference = request.files.get('style_reference')
            if style_reference and allowed_file(style_reference.filename):
                print(f"Style reference received.")
                style_reference_loaded = Image.open(style_reference).convert("RGB")
                print(f"Style image successfully loaded.")
            else:
                print(f"No style reference received.")
                style_reference_loaded = None
        else:
            prompt = data.get('prompt', "").strip()
            number_of_images = data.get("number_of_images", 0)
            color_palette = data.get('color_palette', [])
            base_image_loaded = None
            style_reference_loaded = None
        
        # Print received data for debugging
        print("========Received Data========")
        print(f"Prompt: {prompt}")
        print(f"Number of Images: {number_of_images}")
        print(f"Color Palette: {color_palette}")
        print("========Final Prompt========")
        print(f"{prompt}")

        if not prompt:
            print("Empty prompt")
            return None, None, None, None, "Prompt is required"
        
        return prompt, number_of_images, base_image_loaded, style_reference_loaded, color_palette
    except Exception as e:
        print(f"Validation error: {e}")
        return None, None, None, None, f"Validation error: {str(e)}"

def validate_next_generation_request(data):
    """Validate the next image generation request (e.g., with selected area)."""

@app.route('/generate-first-image', methods=['POST'])
def generate_first_image():
    try:
        # Validate request data
        data = request.form if request.content_type.startswith('multipart/form-data') else request.json
        prompt, number_of_images, base_image_loaded, style_reference_loaded, color_palette = validate_first_generation_request(data)
        
        if not prompt:
            return jsonify({"error": "Prompt is required"}), 400

        # Payload for API & Make request to API
        txt2img_payload = {
            "prompt": prompt,
            "steps": 30,
            "sampler_name": "DPM++ 2M SDE",
            "cfg_scale": 6,
            "width": 512,
            "height": 512,
            "n_iter": number_of_images,
            "seed": -1
        }

        response = requests.post(f"{SD_URL}/sdapi/v1/txt2img", json=txt2img_payload)

        # Handle response
        if response.status_code == 200:
            # print(response.json())
            images_data = response.json().get("images", [])
            if not images_data:
                return jsonify({"error": "No images were generated"}), 500

            image_paths = []
            if len(images_data) > 0:
                for i, image_data in enumerate(images_data):
                    if image_data:
                        image_data = image_data.split(",", 1)[-1]
                        image_bytes = base64.b64decode(image_data)
                        img = Image.open(io.BytesIO(image_bytes))
                        filename = generate_image_filename("png")
                        image_path = os.path.join(IMAGES_FOLDER, filename)
                        img.save(image_path)
                        image_paths.append(f"/static/images/{filename}")
            else:
                return jsonify({"error": "No images were generated"}), 500

            return jsonify({"image_paths": image_paths}), 200
        else:
            return jsonify({"error": response.text}), response.status_code

    except Exception as e:
        print(f"Error generating image: {e}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/images/<filename>')
def serve_image(filename):
    """Serve the generated image files."""
    return send_file(os.path.join(IMAGES_FOLDER, filename), mimetype='image/png')

@app.route('/')
def index():
    """Redirect to the first generation test page."""
    return redirect(url_for('show_first_generation_page'))

@app.route('/test/first-generation', methods=['GET'])
def show_first_generation_page():
    """Serve the HTML test page for the first image generation."""
    # return send_from_directory('templates', 'first-generation.html')
    return send_file('templates/first-generation.html')

@app.route('/test/next-generation', methods=['GET'])
def show_next_generation_page():
    """Serve the HTML test page for the next image generation."""
    # return send_from_directory('templates', 'next-generation.html')
    return send_file('templates/next-generation.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
