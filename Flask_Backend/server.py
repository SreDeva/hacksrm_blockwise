import os
from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
import warnings
from paddleocr import PaddleOCR
import cv2
import re
from groq import Groq
from dotenv import load_dotenv

load_dotenv()
os.environ['GROQ_API_KEY']=os.getenv('GROQ_API_KEY')
client = Groq()

ocr = PaddleOCR(use_angle_cls=True, lang='en')

warnings.filterwarnings("ignore", category=FutureWarning)

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST"], "allow_headers": "*"}})



def read_image_file(file):
    
    file_bytes = file.read()
    
    
    img_array = np.frombuffer(file_bytes, np.uint8)
    
    
    img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
    
    return img

def pan(img):
  result = ocr.ocr(img, cls=True)

  keywords_to_remove = ['/Name', '/Signature', 'Date of Birth']

  text_lines = [word_info[1][0] for line in result for word_info in line]
  confidences = [word_info[1][1] for line in result for word_info in line]

  income_tax_index = next((i for i, text in enumerate(text_lines) if 'income tax' in text.lower()), None)

  processed_text = []
  for i, (text, confidence) in enumerate(zip(text_lines, confidences)):
      if income_tax_index is None or i >= income_tax_index:
          if not any(keyword in text for keyword in keywords_to_remove):
              if confidence > 0.90:
                  cleaned_text = re.sub(r'[^a-zA-Z0-9]', '', text).lower()
                  processed_text.append(cleaned_text)

  result_string = ''.join(processed_text)

  pan_pattern = r'[a-z]{5}[0-9]{4}[a-z]'
  ui = re.findall(pan_pattern, result_string)
  return jsonify({"ui": ui[0],"content":result_string})


def driver(img):
  result = ocr.ocr(img, cls=True)

  text_lines = [word_info[1][0] for line in result for word_info in line]
  confidences = [word_info[1][1] for line in result for word_info in line]

  processed_text = []
  for i, (text, confidence) in enumerate(zip(text_lines, confidences)):
              if confidence > 0.90:
                  cleaned_text = re.sub(r'[^a-zA-Z0-9]', '', text).lower()
                  processed_text.append(cleaned_text)
            
  result_string = ''.join(processed_text)
  print("Result String:", result_string)

  lic_no = r'tn\d{13}'
  ui = re.findall(lic_no, result_string)
  print("License Number: ", ui[0])


def mark(img):
  result = ocr.ocr(img, cls=True)
  text_lines = [word_info[1][0] for line in result for word_info in line]
  confidences = [word_info[1][1] for line in result for word_info in line]

  processed_text = []
  for i, (text, confidence) in enumerate(zip(text_lines, confidences)):
              if confidence > 0.90:
                  cleaned_text = re.sub(r'[^a-zA-Z0-9]', '', text).lower()
                  processed_text.append(cleaned_text)


  result_string = ''.join(processed_text)
  print("Result String:", result_string)


  si_no = r'sino(\d{6})'
  ui = re.findall(si_no, result_string)
  print("SI No: ",ui)


def aadhaar(img_path):
  result = ocr.ocr(img_path, cls=True)

  text_lines = [word_info[1][0] for line in result for word_info in line]
  confidences = [word_info[1][1] for line in result for word_info in line]

  processed_text = []
  for i, (text, confidence) in enumerate(zip(text_lines, confidences)):
              if confidence > 0.90:
                  cleaned_text = re.sub(r'[^a-zA-Z0-9]', '', text).lower()
                  processed_text.append(cleaned_text)

  result_string = ''.join(processed_text)
  #print("Result String:", result_string)

  aad_no = r'\d{12}'
  uii = re.findall(aad_no, result_string)
  #print("Aadhaar Number: ",uii)
  return jsonify({"ui": uii[0],"content":result_string})

@app.route('/getfile', methods=['POST'])
def getfile():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    img = read_image_file(file)
    ui = request.form['type']
    if ui == "pan":
        return pan(img)
    elif ui == "Drivers License":
        driver(img)
    elif ui == "Mark Sheet":
        mark(img)
    elif ui == "aadhaar":
        return aadhaar(img)
    else:
        print("Invalid Input")
    return jsonify({"detected_texts": ui})

def create_chat(question):
    messages=[
        {
            "role": "system",
            "content": """

                            You are an AI-powered Q&A system designed to provide accurate and structured responses about a Web3-based identity verification platform. The platform utilizes blockchain, IPFS, RSA encryption, and machine learning to ensure secure document verification.
                            
                            
                            Knowledge BASE:
                                Your task is to answer user queries concisely and factually based on the provided knowledge base. Ensure clarity and relevance in responses.
                                General Questions

                                Q: What is this platform about?
                                A: This platform enables identity verification in Web3 using blockchain and ML. Officers verify and upload documents, and users can access their own documents securely with encryption and access controls.

                                Q: How does identity verification work here?
                                A: Officers verify user documents, upload them to IPFS, and encrypt them using RSA. Users can then access their documents securely, and ML helps validate hardcopy authenticity.

                                Q: What technologies are used in this platform?
                                A: We use Web3 (IPFS for storage), RSA encryption for security, and machine learning for document verification.

                                Q: How do officers verify documents?
                                A: Officers review user-submitted information, authenticate it, generate the document, and then encrypt and upload it to IPFS.

                                Q: How does the user access their document?
                                A: Once uploaded, a user can log in and decrypt their document. They can also set a deadline for document visibility.

                                Security & Access Control

                                Q: Can an officer view a document after uploading it?
                                A: No, once uploaded, the officer loses access. They must request access, and the user must approve it.

                                Q: How does document expiration work?
                                A: Users can set a deadline for visibility. After the deadline, the document becomes inaccessible.

                                Q: What happens if a user forgets to extend the visibility deadline?
                                A: Once the deadline expires, the document is locked, and the user must reset permissions to access it again.

                                Q: How is the document stored securely?
                                A: We store the document on IPFS and encrypt it with RSA, ensuring only authorized users can decrypt it.

                                Q: What encryption is used for security?
                                A: We use RSA encryption to protect document access. Only authorized parties with the correct private key can decrypt it.

                                ML-Based Document Verification

                                Q: How does the ML model verify document authenticity?
                                A: If someone uploads a photocopy of a document, our ML model compares it with the original to detect alterations.

                                Q: Can the system detect fake documents?
                                A: Yes, the ML model analyzes discrepancies and verifies whether the uploaded hardcopy matches the stored original.

                                Q: What should I do if my document verification fails?
                                A: Ensure the document is clear and not tampered with. If issues persist, contact support.

                                Q: Does the system support different document types?
                                A: Yes, our ML model is trained to handle various official documents.

                                Q: What happens if someone tries to modify a document?
                                A: The ML model flags inconsistencies, and the system alerts the user and relevant authorities.

                                User & Officer Interactions

                                Q: Can a user reject an officer s access request?
                                A: Yes, users have full control over who can access their documents.

                                Q: Can a user revoke access after granting permission?
                                A: Yes, users can withdraw access at any time, even if they previously granted it.

                                Q: What if I lose access to my own document?
                                A: You can use your private key to regain access. If lost, identity re-verification will be required.

                                Q: How do officers request document access?
                                A: Officers send a request through the portal. The user receives a notification and can approve or deny it.

                                Q: Can a document be shared with third parties?
                                A: No, only the user and authorized officers can view it. Users must explicitly grant access to others.
                            Instructions for AI:

                                Answer user queries strictly based on the knowledge base.
                                Keep responses concise and professional.
                                If the query is unclear, ask for clarification.
                                If the question is outside the provided knowledge, respond with "I'm unable to answer that."


                           """
},
        {
            "role": "user",
            "content": f"answer the following:\n\n {question}"
        }
    ]
    response = client.chat.completions.create(
        messages=messages,
        model="llama-3.3-70b-versatile"
    )
    return {"message": response.choices[0].message.content}

@app.route('/chat', methods=['POST'])
def chat_bot():
    data = request.get_json()
    if 'question' not in data:
        return jsonify({"error": "No input string provided"}), 400
    question = data['question']
    output = create_chat(question)
    return jsonify(output)


if __name__ == '__main__':
    app.run(debug=True)