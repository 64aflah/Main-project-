import torch
import torchvision.transforms as transforms
from PIL import Image
import sys
import os

# Model Path
MODEL_PATH = "models/efficientnet_b0_cloud.pth"

# Load Model
if not os.path.exists(MODEL_PATH):
    print(f"Error: Model file not found at {MODEL_PATH}")
    sys.exit(1)

model = torch.load(MODEL_PATH, map_location=torch.device("cpu"))
if isinstance(model, dict):
    model = torch.nn.Sequential(torchvision.models.efficientnet_b0(pretrained=False))
    model.load_state_dict(model)

model.eval()

# Transform
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

# Predict
image_path = sys.argv[1]
if not os.path.exists(image_path):
    print("Error: Image file not found")
    sys.exit(1)

image = Image.open(image_path).convert("RGB")
image = transform(image).unsqueeze(0)

with torch.no_grad():
    output = model(image)
    prediction = torch.argmax(output, dim=1).item()

print(prediction)
