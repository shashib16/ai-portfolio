# api/pdf_reader.py - PDF Reading Utilities
import os
import pdfplumber
from typing import Optional

class PDFReader:
    def __init__(self, pdf_path: str = "assets/shashiFrontendEngineer.pdf"):
        self.pdf_path = pdf_path
        self._cached_content = None
    
    def get_pdf_path(self) -> str:
        """Get the full path to the PDF file"""
        script_dir = os.path.dirname(os.path.abspath(__file__))
        return os.path.join(script_dir, "..", self.pdf_path)
    
    def extract_text(self, force_reload: bool = False) -> str:
        """Extract text from PDF with caching"""
        if self._cached_content and not force_reload:
            return self._cached_content
        
        try:
            full_path = self.get_pdf_path()
            
            if not os.path.exists(full_path):
                raise FileNotFoundError(f"PDF file not found at: {full_path}")
            
            all_text = ""
            with pdfplumber.open(full_path) as pdf:
                for page_num, page in enumerate(pdf.pages):
                    text = page.extract_text()
                    if text:
                        all_text += f"\n--- Page {page_num + 1} ---\n"
                        all_text += text + "\n"
            
            self._cached_content = all_text.strip()
            return self._cached_content
            
        except Exception as e:
            print(f"Error reading PDF: {e}")
            return self._get_fallback_content()
    
    def _get_fallback_content(self) -> str:
        """Fallback content if PDF reading fails"""
        return """
        Shashi Bhushan Kumar Tiwari
        Software Engineer | Full Stack Developer
        
        Email: dev.shashib16@gmail.com
        Phone: (+91) 7763008284
        Location: Bangalore, India
        
        EXPERIENCE:
        Drishya AI - Software Engineer (Mar 2022 – Present)
        - Knowledge Graph Validation System: Reduced validation time by 30%
        - Document Caching Optimization: Improved load time by 92%
        - Built reusable React components adopted in 4+ repositories
        
        SKILLS:
        Languages: Python, JavaScript, TypeScript, SQL, Java
        Frameworks: React.js, Next.js, Express, FastAPI
        Tools: Node.js, Docker, AWS, Git, GitHub
        Databases: MongoDB, MySQL, PostgreSQL, DynamoDB
        """
    
    def extract_sections(self) -> dict:
        """Extract specific sections from resume"""
        full_text = self.extract_text()
        
        sections = {
            "contact": self._extract_section(full_text, ["contact", "email", "phone"]),
            "experience": self._extract_section(full_text, ["experience", "work", "employment"]),
            "skills": self._extract_section(full_text, ["skills", "technologies", "languages"]),
            "projects": self._extract_section(full_text, ["projects", "portfolio"]),
            "education": self._extract_section(full_text, ["education", "university", "degree"])
        }
        
        return sections
    
    def _extract_section(self, text: str, keywords: list) -> str:
        """Extract a specific section based on keywords"""
        lines = text.split('\n')
        section_lines = []
        in_section = False
        
        for line in lines:
            line_lower = line.lower()
            
            # Check if this line starts a relevant section
            if any(keyword in line_lower for keyword in keywords):
                in_section = True
                section_lines.append(line)
            elif in_section:
                # Stop if we hit another section header
                if line.isupper() and len(line.strip()) > 0 and not any(keyword in line_lower for keyword in keywords):
                    break
                section_lines.append(line)
        
        return '\n'.join(section_lines).strip()

# Initialize PDF reader
pdf_reader = PDFReader()
