import sys
import os

try:
    from reportlab.lib.pagesizes import letter
    from reportlab.lib import colors
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.units import inch
except ImportError:
    print("reportlab not installed yet")
    sys.exit(1)

pdf_filename = "SkillSwap_AI_Complete_Guide.pdf"
doc = SimpleDocTemplate(
    pdf_filename,
    pagesize=letter,
    rightMargin=40,
    leftMargin=40,
    topMargin=40,
    bottomMargin=40
)

styles = getSampleStyleSheet()

# Custom styles
primary_color = colors.HexColor("#4F46E5")
dark_bg = colors.HexColor("#0F0C20")
text_color = colors.HexColor("#1E293B")

title_style = ParagraphStyle(
    'TitleStyle',
    parent=styles['Heading1'],
    fontName='Helvetica-Bold',
    fontSize=24,
    leading=28,
    textColor=primary_color,
    alignment=1, # Center
    spaceAfter=10
)

subtitle_style = ParagraphStyle(
    'SubtitleStyle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=12,
    leading=16,
    textColor=colors.HexColor("#64748B"),
    alignment=1,
    spaceAfter=20
)

h1_style = ParagraphStyle(
    'H1Style',
    parent=styles['Heading2'],
    fontName='Helvetica-Bold',
    fontSize=16,
    leading=20,
    textColor=primary_color,
    spaceBefore=15,
    spaceAfter=8
)

h2_style = ParagraphStyle(
    'H2Style',
    parent=styles['Heading3'],
    fontName='Helvetica-Bold',
    fontSize=12,
    leading=16,
    textColor=colors.HexColor("#0F172A"),
    spaceBefore=10,
    spaceAfter=4
)

body_style = ParagraphStyle(
    'BodyStyle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=10,
    leading=14,
    textColor=text_color,
    spaceAfter=8
)

bullet_style = ParagraphStyle(
    'BulletStyle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9.5,
    leading=13.5,
    textColor=text_color,
    leftIndent=15,
    spaceAfter=4
)

code_style = ParagraphStyle(
    'CodeStyle',
    parent=styles['Normal'],
    fontName='Courier',
    fontSize=9,
    leading=12,
    textColor=colors.HexColor("#334155"),
    backColor=colors.HexColor("#F1F5F9"),
    borderPadding=6,
    spaceBefore=4,
    spaceAfter=8
)

story = []

# Title & Subtitle
story.append(Paragraph("<b>SkillSwap AI</b> — Complete Platform Guide", title_style))
story.append(Paragraph("The AI-Powered Peer-to-Peer Campus Skill Exchange & Mentorship SaaS<br/><i>Written in Simple Words for Students, Mentors & Investors</i>", subtitle_style))
story.append(HRFlowable(width="100%", thickness=1, color=primary_color, spaceAfter=15))

# Section 1
story.append(Paragraph("1. What is SkillSwap AI?", h1_style))
story.append(Paragraph(
    "<b>SkillSwap AI</b> is a website and web application where students can teach skills they already know and learn new skills for free using a credit-based system.",
    body_style
))
story.append(Paragraph(
    "Instead of paying expensive money for online courses or bootcamps, students trade their knowledge like currency. "
    "For example: A student who knows React can teach a junior student, earn credits, and then use those credits to get a 1-on-1 mentorship session on Artificial Intelligence or Spring Boot.",
    body_style
))

# Section 2
story.append(Paragraph("2. The Core Problem & Simple Solution", h1_style))
data_prob = [
    [Paragraph("<b>The Problem</b>", h2_style), Paragraph("<b>The SkillSwap AI Solution</b>", h2_style)],
    [
        Paragraph("• Online bootcamps cost thousands of dollars.<br/>• Recorded video courses feel lonely.<br/>• Senior student mentors are hard to reach.", bullet_style),
        Paragraph("• 100% Free peer mentorship using credits.<br/>• 1-on-1 live video calls with real students.<br/>• AI automatically matches you with the best mentor.", bullet_style)
    ]
]
t_prob = Table(data_prob, colWidths=[260, 260])
t_prob.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F8FAFC")),
    ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
    ('PADDING', (0,0), (-1,-1), 8),
]))
story.append(t_prob)
story.append(Spacer(1, 10))

# Section 3
story.append(Paragraph("3. How SkillSwap AI Works (Step-by-Step)", h1_style))
steps = [
    ("Step 1: Sign Up", "Create a free account using your college email address. You instantly receive 50 free credits in your wallet."),
    ("Step 2: Find a Skill or Roadmap", "Search for a skill (like Java, Python, or Figma Design) or use the AI Roadmap tool to generate a 4-week learning plan."),
    ("Step 3: Book a Session", "Pick a date and time to book a 1-on-1 video mentorship session with a student mentor."),
    ("Step 4: Earn Credits by Teaching", "To get more credits, list skills you are good at and mentor junior students."),
    ("Step 5: Get Verified Certificates", "After finishing a session, receive a digital completion certificate to share on LinkedIn & GitHub.")
]
for title, desc in steps:
    story.append(Paragraph(f"<b>{title}</b>: {desc}", bullet_style))

story.append(Spacer(1, 10))

# Section 4
story.append(Paragraph("4. Key Features & AI Capabilities", h1_style))
features_data = [
    [Paragraph("<b>Feature</b>", h2_style), Paragraph("<b>What It Does (In Simple Words)</b>", h2_style)],
    [Paragraph("<b>AI Learning Roadmap</b>", body_style), Paragraph("Type any skill (e.g. PyTorch), and AI builds a step-by-step 4-week learning curriculum.", body_style)],
    [Paragraph("<b>AI Mentor Matcher</b>", body_style), Paragraph("AI analyzes your profile and recommends top-rated student mentors in your college.", body_style)],
    [Paragraph("<b>Credit Escrow System</b>", body_style), Paragraph("Credits stay locked safely during booking and are transferred only when the session ends.", body_style)],
    [Paragraph("<b>Session Chat</b>", body_style), Paragraph("Direct messaging thread between learner and mentor to prepare before the video call.", body_style)],
    [Paragraph("<b>Verified Certificates</b>", body_style), Paragraph("Cryptographically signed digital certificate with a verification code (`CERT-SKILLSWAP-123`).", body_style)],
    [Paragraph("<b>Admin Analytics</b>", body_style), Paragraph("Admin dashboard to manage users, suspend malicious accounts, and audit transactions.", body_style)]
]
t_feat = Table(features_data, colWidths=[150, 370])
t_feat.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#EEF2FF")),
    ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
    ('PADDING', (0,0), (-1,-1), 6),
]))
story.append(t_feat)

story.append(Spacer(1, 10))

# Section 5
story.append(Paragraph("5. How Real Money & Payouts Work", h1_style))
story.append(Paragraph(
    "1. <b>Buying Credits</b>: Students who do not want to teach can buy credit packs (e.g., Rs. 599 for 120 credits) using UPI, Google Pay, or Credit Cards via Razorpay. The money goes directly into your bank account.<br/>"
    "2. <b>Mentor Payouts</b>: Mentors who earn credits by teaching can cash out their credits for real money (e.g., 100 credits = Rs. 500) directly to their UPI ID or bank account.",
    body_style
))

# Section 6
story.append(Paragraph("6. Technology Stack", h1_style))
story.append(Paragraph("• <b>Frontend</b>: React.js + Tailwind CSS (Modern Glassmorphism Design)<br/>• <b>Backend</b>: Spring Boot 3 (Java 17) + JWT Security Filters<br/>• <b>Database</b>: MySQL 8.0 & H2 Database Engine<br/>• <b>AI Integration</b>: OpenAI API (with offline simulation engine)<br/>• <b>Payments</b>: Razorpay Payment Gateway API", body_style))

# Section 7
story.append(Paragraph("7. Sample Demo Accounts", h1_style))
demo_data = [
    [Paragraph("<b>Role</b>", h2_style), Paragraph("<b>Email</b>", h2_style), Paragraph("<b>Password</b>", h2_style), Paragraph("<b>Initial Credits</b>", h2_style)],
    [Paragraph("Student / Mentor", body_style), Paragraph("alex.chen@stanford.edu", body_style), Paragraph("Password123!", body_style), Paragraph("120 Credits", body_style)],
    [Paragraph("AI Specialist", body_style), Paragraph("priya.sharma@mit.edu", body_style), Paragraph("Password123!", body_style), Paragraph("190 Credits", body_style)],
    [Paragraph("Platform Admin", body_style), Paragraph("admin@skillswap.ai", body_style), Paragraph("Password123!", body_style), Paragraph("500 Credits", body_style)]
]
t_demo = Table(demo_data, colWidths=[120, 180, 110, 110])
t_demo.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#FEF3C7")),
    ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#FCD34D")),
    ('PADDING', (0,0), (-1,-1), 6),
]))
story.append(t_demo)

# Build Document
doc.build(story)
print("PDF successfully generated: SkillSwap_AI_Complete_Guide.pdf")
