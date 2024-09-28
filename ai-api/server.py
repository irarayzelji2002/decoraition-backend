import os
import io
import cv2
import json
import uuid
import base64
import requests
import thecolorapi
import numpy as np
from PIL import Image
from flask_cors import CORS
from flask import Flask, request, jsonify, send_file, redirect, url_for, send_from_directory, render_template

app = Flask(__name__)
CORS(app)

# Constant variables
SD_URL = "http://127.0.0.1:7860"
IMAGES_FOLDER = 'static/images'
if not os.path.exists(IMAGES_FOLDER):
    os.makedirs(IMAGES_FOLDER)
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app.config['IMAGES_FOLDER'] = IMAGES_FOLDER
sdxl_styles = [
    {
        "name": "base",
        "prompt": "{prompt}",
        "negative_prompt": ""
    },
    {
        "name": "3D Model",
        "prompt": "professional 3d model of {prompt} . octane render, highly detailed, volumetric, dramatic lighting",
        "negative_prompt": "ugly, deformed, noisy, low poly, blurry, painting, person, people, face, hands, legs, feet"
    }
]

# File-related functions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def generate_image_filename(extension="png"):
    return f"{uuid.uuid4()}.{extension}"

def load_and_encode_image(image_file):
    """Load an image using PIL and encode it to base64 PNG for ControlNet."""
    try:
        # Load image with PIL
        image = Image.open(image_file).convert('RGB')

        # Convert PIL image to a numpy array
        image_np = np.array(image)

        # Encode into PNG using OpenCV and then base64
        retval, bytes_img = cv2.imencode('.png', image_np)
        encoded_image = base64.b64encode(bytes_img).decode('utf-8')

        return encoded_image
    except Exception as e:
        print(f"Error loading and encoding image: {e}")
        return None

def save_images(image_data_list):
    """Helper function to save images and return file paths."""
    saved_paths = []
    for image_data in image_data_list:
        if image_data:
            image_bytes = base64.b64decode(image_data.split(",", 1)[-1])
            img = Image.open(io.BytesIO(image_bytes))
            filename = generate_image_filename("png")
            image_path = os.path.join(IMAGES_FOLDER, filename)
            img.save(image_path)
            saved_paths.append(f"/static/images/{filename}")
    return saved_paths

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
        return base_prompt

# SDXL Styles with color function
def apply_sdxl_style(selected_style_name, prompt, color_palette=None):
    """Apply the SDXL style to the user prompt and insert color description right after the {prompt}."""
    selected_style = next((style for style in sdxl_styles if style["name"] == selected_style_name), None)

    if selected_style:
        # Build the color description if the color palette is provided
        if color_palette:
            color_names = [thecolorapi_hex_to_color_name(hex_code) for hex_code in color_palette]
            colors_description = f" with colors {', '.join(color_names)}"
        else:
            colors_description = ""

        # Replace the {prompt} placeholder with the user input and insert the color description
        prompt = selected_style["prompt"].replace("{prompt}", f"{prompt}{colors_description}")
        negative_prompt = selected_style["negative_prompt"]

        return prompt, negative_prompt
    else:
        # In case no style is found, apply color palette to base prompt (if color_palette exists)
        if color_palette:
            color_names = [thecolorapi_hex_to_color_name(hex_code) for hex_code in color_palette]
            colors_description = f" with colors {', '.join(color_names)}"
            prompt = f"{prompt}{colors_description}"
        # Return original prompt with no negative prompt
        return prompt, ""

# FIRST IMAGE GENERATION
def validate_first_generation_request(data):
    """Validate the first image generation request."""
    try:
        base_image_encoded = None
        style_reference_encoded = None
        
        if request.content_type.startswith('multipart/form-data'):
            print("Multipart form data detected.")
            # Prompt and number of images
            prompt = data.get('prompt', "").strip()
            number_of_images = int(data.get('number_of_images', 0))
            # Color palette
            color_palette_str = data.get('color_palette', '[]')
            color_palette = json.loads(color_palette_str) if color_palette_str else []
            # Base image
            base_image = request.files.get('base_image')
            if base_image and allowed_file(base_image.filename):
                print(f"Base image received.")
                base_image_encoded = load_and_encode_image(base_image)
                print(f"Base image successfully loaded.")
            else:
                print(f"No base image received.")
                base_image_encoded = None
            # Style reference
            style_reference = request.files.get('style_reference')
            if style_reference and allowed_file(style_reference.filename):
                print(f"Style reference received.")
                style_reference_encoded = load_and_encode_image(style_reference)
                print(f"Style image successfully loaded.")
            else:
                print(f"No style reference received.")
                style_reference_encoded = None
        else:
            prompt = data.get('prompt', "").strip()
            number_of_images = data.get("number_of_images", 0)
            color_palette = data.get('color_palette', [])
            base_image_encoded = None
            style_reference_encoded = None
        
        # Print received data for debugging
        print("========Received Data========")
        print(f"Prompt: {prompt}")
        print(f"Number of Images: {number_of_images}")
        print(f"Color Palette: {color_palette}")
        
        if not prompt:
            print("Empty prompt")
            return None, None, None, None, "Prompt is required"
        
        prompt, negative_prompt = apply_sdxl_style("3D Model", prompt, color_palette)
        print("========Final Prompt========")
        print(f"Prompt: {prompt}")
        print(f"Negative Prompt: {negative_prompt}")

        return prompt, negative_prompt, number_of_images, base_image_encoded, style_reference_encoded
    except Exception as e:
        print(f"Validation error: {e}")
        return None, None, None, None, f"Validation error: {str(e)}"

def generate_first_image(prompt, negative_prompt, number_of_images, base_image, style_reference):
    """First generation core logic"""
    try:
        if base_image and not style_reference:
            # Case 1: prompt with base image
            print("========First Gen: prompt with base image (Canny)========")
            payload = {
                "prompt": prompt,
                "negative_prompt": negative_prompt,
                "sampler_name": "DPM++ 2M SDE",
                "steps": 30,
                "cfg_scale": 6,
                "width": 512,
                "height": 512,
                "n_iter": number_of_images,
                "seed": -1,
                "enable_hr": True,
                "hr_scale": 1.5,
                "hr_upscaler": "4x_NMKD-Siax_200k",
                "hr_resize_x": 0,
                "hr_resize_y": 0,
                "denoising_strength": 0.3,
                "alwayson_scripts": {
                    "controlnet": {
                        "args": [{
                            "enabled": True,
                            "image": base_image,
                            "model": "diffusion_sd_controlnet_canny [a3cd7cd6]",
                            "module": "canny",
                            "weight": 1,
                            "resize_mode": "Scale to Fit (Inner Fit)",
                            "guidance_start": 0,
                            "guidance_end": 1,
                            "control_mode": "ControlNet is more important",
                            "pixel_perfect": True
                        }]
                    }
                }
            }
        elif style_reference and not base_image:
            # Case 2: prompt with style reference
            print("========First Gen: prompt with style reference (T2I-Adapter Color)========")
            payload = {
                "prompt": prompt,
                "negative_prompt": negative_prompt,
                "sampler_name": "DPM++ 2M SDE",
                "steps": 30,
                "cfg_scale": 6,
                "width": 512,
                "height": 512,
                "n_iter": number_of_images,
                "seed": -1,
                "enable_hr": True,
                "hr_scale": 1.5,
                "hr_upscaler": "4x_NMKD-Siax_200k",
                "hr_resize_x": 0,
                "hr_resize_y": 0,
                "denoising_strength": 0.3,
                "alwayson_scripts": {
                    "controlnet": {
                        "args": [{
                            "enabled": True,
                            "image": style_reference,
                            "model": "t2iadapter_color_sd14v1 [8522029d]",
                            "module": "t2ia_color_grid",
                            "weight": 1.2,
                            "resize_mode": "Scale to Fit (Inner Fit)",
                            "guidance_start": 0,
                            "guidance_end": 1,
                            "control_mode": "ControlNet is more important",
                            "pixel_perfect": True
                        }]
                    }
                }
            }
        elif base_image and style_reference:
            # Case 3: prompt with base image and style reference
            print("========First Gen: prompt with base image and style reference (Canny + T2I-Adapter Color)========")
            payload = {
                "prompt": prompt,
                "negative_prompt": negative_prompt,
                "sampler_name": "DPM++ 2M SDE",
                "steps": 30,
                "cfg_scale": 6,
                "width": 512,
                "height": 512,
                "n_iter": number_of_images,
                "seed": -1,
                "enable_hr": True,
                "hr_scale": 1.5,
                "hr_upscaler": "4x_NMKD-Siax_200k",
                "hr_resize_x": 0,
                "hr_resize_y": 0,
                "denoising_strength": 0.3,
                "alwayson_scripts": {
                    "controlnet": {
                        "args": [
                            {
                                "enabled": True,
                                "image": base_image,
                                "model": "diffusion_sd_controlnet_canny [a3cd7cd6]",
                                "module": "canny",
                                "weight": 1,
                                "resize_mode": "Scale to Fit (Inner Fit)",
                                "guidance_start": 0,
                                "guidance_end": 1,
                                "control_mode": "ControlNet is more important",
                                "pixel_perfect": True
                            },
                            {
                                "enabled": True,
                                "image": style_reference,
                                "model": "t2iadapter_color_sd14v1 [8522029d]",
                                "module": "t2ia_color_grid",
                                "weight": 1.2,
                                "resize_mode": "Scale to Fit (Inner Fit)",
                                "guidance_start": 0,
                                "guidance_end": 1,
                                "control_mode": "ControlNet is more important",
                                "pixel_perfect": True
                            }
                        ]
                    }
                }
            }
        else:
            # Case 4: prompt only
            print("========First Gen: prompt only-=======")
            payload = {
                "prompt": prompt,
                "negative_prompt": negative_prompt,
                "sampler_name": "DPM++ 2M SDE",
                "steps": 30,
                "cfg_scale": 6,
                "width": 512,
                "height": 512,
                "n_iter": number_of_images,
                "seed": -1,
                "enable_hr": True,
                "hr_scale": 1.5,
                "hr_upscaler": "4x_NMKD-Siax_200k",
                "hr_resize_x": 0,
                "hr_resize_y": 0,
                "denoising_strength": 0.3
            }

        response = requests.post(f"{SD_URL}/sdapi/v1/txt2img", json=payload)
        return response

    except Exception as e:
        print(f"Error generating image: {e}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/generate-first-image', methods=['POST'])
def generate_first_image_route():
    """Route to generate first image"""
    try:
        # Validate request data
        data = request.form if request.content_type.startswith('multipart/form-data') else request.json
        prompt, negative_prompt, number_of_images, base_image_encoded, style_reference_encoded = validate_first_generation_request(data)
        
        if not prompt:
            return jsonify({"error": "Prompt is required"}), 400

        # Call the image generation function
        response = generate_first_image(prompt, negative_prompt, number_of_images, base_image_encoded, style_reference_encoded)

        # Handle response
        if response.status_code == 200 and isinstance(response.json(), dict) and response.json().get("images"):
            images_data = response.json().get("images", [])
            image_paths = save_images(images_data)
            return jsonify({"image_paths": image_paths}), 200
        else:
            return jsonify({"error": "No images were generated. " + response.text}), 500

    except Exception as e:
        print(f"Error generating image: {e}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

# GENERATE SAM MASK
def generate_sam_mask(init_image, mask_prompt):
    """Generate SAM mask based on an image and text prompt."""
    if not mask_prompt:
        return None, 400

    print("========Next Gen: generating mask========")
    try:
        # Prepare SAM request payload
        payload = {
            "sam_model_name": "sam_vit_b_01ec64.pth",
            "input_image": init_image,
            "sam_positive_points": [],
            "sam_negative_points": [],
            "dino_enabled": True,
            "dino_model_name": "GroundingDINO_SwinT_OGC (694MB)",
            "dino_text_prompt": mask_prompt,
            "dino_box_threshold": 0.3,
            "dino_preview_checkbox": False,
        }

        # Call SAM API to generate the mask
        response = requests.post(f"{SD_URL}/sam/sam-predict", json=payload)
        if response.status_code != 200:
            return None, response.status_code

        reply_json = response.json()
        print(reply_json.get("msg", "No message"))

        masks = reply_json.get("masks")
        if not masks:
            print("No masks returned from SAM.")
            return None, 400

        try:
            # Dilate the masks and collect responses
            dilate_payloads = [
                {"input_image": init_image, "mask": masks[i], "dilate_amount": 30}
                for i in range(min(3, len(masks)))  # Ensure we process up to 3 masks
            ]

            replies_dilate = []
            for payload in dilate_payloads:
                dilate_response = requests.post(f"{SD_URL}/sam/dilate-mask", json=payload)
                replies_dilate.append(dilate_response.json())

            # Extract blended images, masks, and masked images
            reply_dilate = {
                "blended_images": [reply["blended_image"] for reply in replies_dilate],
                "masks": [reply["mask"] for reply in replies_dilate],
                "masked_images": [reply["masked_image"] for reply in replies_dilate],
            }
            return reply_dilate

        except Exception as e:
            print(f"Error expanding SAM mask: {e}")
            print("Returning original SAM mask instead.")
            return reply_json

    except Exception as e:
        print(f"Error generating SAM mask: {e}")
        return {"error": f"An error occurred: {str(e)}"}, 500

@app.route('/generate-sam-mask', methods=['POST'])
def generate_sam_mask_route():
    """Route to generate SAM mask."""
    try:
        # Validate request data
        data = request.form if request.content_type.startswith('multipart/form-data') else request.json
        mask_prompt = data.get('mask_prompt', "").strip()
        init_image = request.files.get('init_image')
        
        if not init_image or not allowed_file(init_image.filename):
            return jsonify({"error": "Valid base image is required"}), 400
        if not mask_prompt:
            return jsonify({"error": "Mask prompt is required"}), 400
        init_image_encoded = load_and_encode_image(init_image)

        # Call generate SAM mask function
        response = generate_sam_mask(init_image_encoded, mask_prompt)

        # Handle response
        if isinstance(response, dict) and all(key in response for key in ["blended_images", "masks", "masked_images"]):
            # Save images and return paths
            image_paths = {
                "blended_images": save_images(response.get("blended_images")),
                "masks": save_images(response.get("masks")),
                "masked_images": save_images(response.get("masked_images")),
            }
            return jsonify({"image_paths": image_paths}), 200
        else:
            return jsonify({"error": "Failed to generate SAM mask. Incomplete response."}), 500

    except Exception as e:
        print(f"Error generating SAM mask: {e}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

# NEXT IMAGE GENERATION
def validate_next_generation_request(data):
    """Validate the next image generation request"""
    try:
        init_image_encoded = None
        style_reference_encoded = None
        sam_mask = None
        user_mask_encoded = None
        
        if request.content_type.startswith('multipart/form-data'):
            print("Multipart form data detected.")
            # Prompt, mask prompt, and number of images
            prompt = data.get('prompt', "").strip()
            number_of_images = int(data.get('number_of_images', 0))
            # Color palette
            color_palette_str = data.get('color_palette', '[]')
            color_palette = json.loads(color_palette_str) if color_palette_str else []
            # Init image
            init_image = request.files.get('init_image')
            if init_image and allowed_file(init_image.filename):
                print(f"Init image received.")
                init_image_encoded = load_and_encode_image(init_image)
                print(f"Init image successfully loaded.")
            else:
                print(f"No init image received.")
                init_image_encoded = None
            # Style reference
            style_reference = request.files.get('style_reference')
            if style_reference and allowed_file(style_reference.filename):
                print(f"Style reference received.")
                style_reference_encoded = load_and_encode_image(style_reference)
                print(f"Style image successfully loaded.")
            else:
                print(f"No style reference received.")
                style_reference_encoded = None
            # SAM mask
            sam_mask = request.files.get('sam_mask')
            if sam_mask and allowed_file(sam_mask.filename):
                print(f"SAM mask received.")
                sam_mask_encoded = load_and_encode_image(sam_mask)
                print(f"SAM mask successfully loaded.")
            else:
                print(f"No SAM mask received.")
                sam_mask_encoded = None
            # User mask
            user_mask = request.files.get('user_mask')
            if user_mask and allowed_file(user_mask.filename):
                print(f"User mask received.")
                user_mask_encoded = load_and_encode_image(user_mask)
                print(f"User mask successfully loaded.")
            else:
                print(f"No user_mask received.")
                user_mask_encoded = None
        else:
            prompt = data.get('prompt', "").strip()
            number_of_images = data.get("number_of_images", 0)
            color_palette = data.get('color_palette', [])
            init_image_encoded = None
            style_reference_encoded = None
        
        # Print received data for debugging
        print("========Received Data========")
        print(f"Prompt: {prompt}")
        print(f"Number of Images: {number_of_images}")
        print(f"Color Palette: {color_palette}")

        if not prompt:
            print("Empty prompt")
            return None, None, None, None, None, None, None, "Prompt is required"
        
        prompt, negative_prompt = apply_sdxl_style("3D Model", prompt, color_palette)
        print("========Final Prompt========")
        print(f"Prompt: {prompt}")
        print(f"Negative Prompt: {negative_prompt}")

        return prompt, negative_prompt, number_of_images, init_image_encoded, sam_mask_encoded, user_mask_encoded, style_reference_encoded
    except Exception as e:
        print(f"Validation error: {e}")
        return None, None, None, None, f"Validation error: {str(e)}"

def generate_next_image(prompt, negative_prompt, number_of_images, init_image, sam_mask, user_mask, style_reference):
    """Next generation core logic"""
    try:
        if user_mask and not style_reference:
            # Case 1: prompt, user mask
            print("========Next Gen: prompt, user mask========")
            # combine user mask and sam mask
            # use final mask in generation
        elif style_reference and not user_mask:
            # Case 2: prompt, style reference
            print("========Next Gen: prompt, style reference (Canny)========")
            # final mask = sam mask
            # use final mask & style_reference in generation
            payload = {
                "prompt": prompt,
                "negative_prompt": negative_prompt,
                "sampler_name": "DPM++ 2M SDE",
                "steps": 30,
                "cfg_scale": 7,
                "width": 512,
                "height": 512,
                "n_iter": number_of_images,
                "seed": -1,
                "init_images": [init_image],  # The original image to refine
                "mask": sam_mask,  # The mask generated by SAM
                "denoising_strength": 0.75,  # Controls the impact of the original image
                "resize_mode": 0,  # Crop and resize
                "alwayson_scripts": {
                    "controlnet": {
                        "args": [
                            {
                                "enabled": True,
                                "image": style_reference,
                                "model": "diffusion_sd_controlnet_canny [a3cd7cd6]",
                                "module": "canny",
                                "weight": 1,
                                "resize_mode": "Scale to Fit (Inner Fit)",
                                "guidance_start": 0,
                                "guidance_end": 1,
                                "control_mode": "ControlNet is more important",
                                "pixel_perfect": True
                            },
                        ]
                    }
                }
            }
        elif user_mask and style_reference:
            # Case 3: prompt, user mask, style reference
            print("========Next Gen: prompt, user mask, style reference (Canny)========")
            # combine user mask and sam mask
            # use final mask in generation
        else:
            # Case 4: prompt, mask prompt
            print("========Next Gen: prompt, mask prompt-=======")
            # final mask = sam mask
            # use final mask in generation
            payload = {
                "prompt": prompt,
                "negative_prompt": negative_prompt,
                "sampler_name": "DPM++ 2M SDE",
                "steps": 30,
                "cfg_scale": 7,
                "width": 512,
                "height": 512,
                "n_iter": number_of_images,
                "seed": -1,
                "init_images": [init_image],  # The original image to refine
                "mask": sam_mask,  # The mask generated by SAM
                "denoising_strength": 0.75,  # Controls the impact of the original image
                "resize_mode": 0,  # Crop and resize
            }

        response = requests.post(f"{SD_URL}/sdapi/v1/img2img", json=payload)
        return response

    except Exception as e:
        print(f"Error generating image: {e}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/generate-next-image', methods=['POST'])
def generate_next_image_route():
    """Route to generate next image, must have generated SAM mask beforehand"""
    try:
        # Validate request data
        data = request.form if request.content_type.startswith('multipart/form-data') else request.json
        prompt, negative_prompt, number_of_images, init_image, sam_mask, user_mask, style_reference = validate_next_generation_request(data)
        
        if not prompt:
            return jsonify({"error": "Prompt is required"}), 400


        # Payload for API & Make request to API
        response = generate_next_image(prompt, negative_prompt, number_of_images, init_image, sam_mask, user_mask, style_reference)

        # Handle response
        if response.status_code == 200 and isinstance(response.json(), dict) and response.json().get("images"):
            images_data = response.json().get("images", [])
            image_paths = []
            for i, image_data in enumerate(images_data):
                if image_data:
                    image_data = image_data.split(",", 1)[-1]
                    image_bytes = base64.b64decode(image_data)
                    img = Image.open(io.BytesIO(image_bytes))
                    filename = generate_image_filename("png")
                    image_path = os.path.join(IMAGES_FOLDER, filename)
                    img.save(image_path)
                    image_paths.append(f"/static/images/{filename}")

            return jsonify({"image_paths": image_paths}), 200
        else:
            return jsonify({"error": "No images were generated. " + response.text}), 500

    except Exception as e:
        print(f"Error generating image: {e}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

# OTHER APP ROUTES
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
    # return send_file('templates/first-generation.html')
    return render_template('first-generation.html')

@app.route('/test/next-generation', methods=['GET'])
def show_next_generation_page():
    """Serve the HTML test page for the next image generation."""
    # return send_from_directory('templates', 'next-generation.html')
    # return send_file('templates/next-generation.html')
    return render_template('next-generation.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
    # app.run(debug=True, port=8080)
