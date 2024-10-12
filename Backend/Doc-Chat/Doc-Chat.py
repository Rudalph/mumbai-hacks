from flask import Flask, request, jsonify
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.prompts import PromptTemplate
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from langchain_community.vectorstores import Chroma
from langchain_community.document_loaders import PyPDFDirectoryLoader
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

os.environ["GOOGLE_API_KEY"] = "AIzaSyAThmkRyMBm177cgKljHkVrAd3BLPpL2nk"

llm = ChatGoogleGenerativeAI(model="models/gemini-1.5-pro-latest")
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")

def load_documents():
    directory="./Data"

    loader = PyPDFDirectoryLoader(directory)   
    documents = loader.load()


    text_splitter = CharacterTextSplitter(
        separator=".",
        chunk_size=4000,
        chunk_overlap=3000,
        length_function=len,
        is_separator_regex=False,
    )
    print(text_splitter)
    pages = loader.load_and_split(text_splitter)

    vectordb = Chroma.from_documents(pages, embeddings, persist_directory="./chroma_db")


vectorstore_disk = Chroma(
    persist_directory="./chroma_db",
    embedding_function=embeddings
)

retriever = vectorstore_disk.as_retriever(search_kwargs={"k": 5})

template = """
You are a helpful AI assistant.
Answer based on the context provided. 
context: {context}
input: {input}
answer:
"""

prompt = PromptTemplate.from_template(template)
combine_docs_chain = create_stuff_documents_chain(llm, prompt)
retrieval_chain = create_retrieval_chain(retriever, combine_docs_chain)



@app.route('/ask', methods=['POST'])
def ask_question():
    
    data = request.json
    question = data['question']
    response = retrieval_chain.invoke({"input": question})
    answer = response["answer"]
    return jsonify({"answer": answer})



UPLOAD_FOLDER = os.path.join(os.getcwd(), 'Data')

# Ensure the upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Set the maximum file size (if necessary)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB

@app.route('/savefolder', methods=['POST'])
def save_file_to_folder():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part in the request'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400

    if file:
        # Save the file to the desired folder
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)
        load_documents()
        return jsonify({'message': f'File {file.filename} uploaded successfully!'}), 200


if __name__ == '__main__':
    app.run(debug=True,port=5003)
