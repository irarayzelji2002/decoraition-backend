from diffusers import DiffusionPipeline
import torch
from huggingface_hub import login

def main():
    # Ensure you login
    access_token = "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"
    login(token = access_token)

    # Model ID stabilityai/stable-diffusion-2-1-base stabilityai/stable-diffusion-3-medium
    model_id = "stabilityai/stable-diffusion-2-1-base"

    try:
        # Load the Stable Diffusion model torch_dtype=torch.float16,
        if torch.cuda.is_available():
            # Use CUDA with float16 if available
            pipeline = DiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16, use_auth_token=access_token)
            device = torch.device("cuda")
        else:
            # Use CPU without float16
            pipeline = DiffusionPipeline.from_pretrained(model_id, use_auth_token=access_token)
            device = torch.device("cpu")
        
        # Move pipeline to selected device
        pipeline = pipeline.to(device)
        print(f"Model loaded successfully. Running on device: {device}")

        # Define your prompt
        prompt = "A room-sized stage design inspired by Dear Evan Hansen ending tree scene"
        # ex prompt: A beautiful landscape with mountains and a river, in the style of Van Gogh

        try:
            # Generate the image
            image = pipeline(prompt).images[0]
            
            # Save the image
            image.save("output3.png")
            print("Image generated and saved as output3.png.")
        
        except Exception as e:
            print(f"Error generating image: {e}")
    
    except Exception as e:
        print(f"Error loading model: {e}")

if __name__ == "__main__":
    main()
