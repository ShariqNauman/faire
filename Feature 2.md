# Feature 2: Transparency System

This system provides complete public, developer, and regulatory transparency to rebuild trust and prove legal due diligence in automated recruitment.

---

## Subfeature 1: Impartial Candidate Feedback (Duty of Honesty)

### Chosen Framework:
**Deontology (Absolute Duty of Honesty & Disclosure):**
Faire directly addresses the iTutorGroup age-bias case, where over 200 older candidates were auto-rejected without notice and without knowing that an age filter existed. Research shows transparent feedback significantly improves candidates' perceptions of fairness (Sánchez-Monedero et al., 2025). Failing to disclose explanations makes decisions feel random, which destroys corporate trust and leaves people confused (Bhattacharya & Verbert, 2025). 

Faire publishes job requirements transparently before applicant submissions. If candidate resumes are rejected, it automatically delivers a jargon-free email summary showing the exact required criteria that were not met, keeping candidates informed of automated recruitment tools while satisfying the duties of absolute truth and clarity.

### Pseudocode (Sánchez-Monedero et al., 2025):
```python
FUNCTION EvaluateAndInformCandidate(Resume, JobCriteria, CandidateEmail, CandidateAge):
    # Step 1: Pre-Submission Disclosure
    DisplayJobCriteriaPublicly(JobCriteria) # Pre-submission notice of evaluation parameters

    # Step 2: Impartial Skills Evaluation
    SkillsMissing = Model.CompareSkills(Resume, JobCriteria)

    IF SkillsMissing IS EMPTY:
        TriggerSuccessNotice(CandidateEmail)
    ELSE:
        # Deontological Duty of Honesty & Plain Feedback (Bhattacharya & Verbert, 2025)
        Explanation = CompilePlainLanguageSummary(SkillsMissing)
        
        # Note: CandidateAge is excluded from calculations to ensure compliance
        SendAutomatedNotification(
            to = CandidateEmail,
            subject = "Application status update — Faire platform notice",
            body = "Our system evaluated your resume against required skillsets. Jargon-free details: " + Explanation
        )
END FUNCTION
```

---

## Subfeature 2: Model Notice, Explanation & Development Documentation

### Chosen Framework:
**Deontology (Duty to Document):**
Developers have an absolute duty to document algorithms and training settings. This aligns with the "Notice and Explanation" principle outlined in the White House Blueprint for an AI Bill of Rights: designers must provide plain language documentation including clear descriptions of how systems function and explanations for outcomes (IBM, 2026). Faire scans weights and blocks compile-savings until developers write explanations for parameters flagged as sensitive.

### Pseudocode (IBM, 2026 / White House Blueprint):
```python
FUNCTION DocumentModelAssembly(ModelID, Parameters, DeveloperID):
    SensitiveFlags = ScanParametersForProtectedTraits(Parameters)

    # Block model from saving unless justifications provided
    IF SensitiveFlags IS NOT EMPTY:
        FOR EACH flag IN SensitiveFlags:
            Justification = RequestWrittenDescription(DeveloperID, flag)
            IF Justification IS EMPTY:
                RETURN ERROR("Compilation Blocked: Sensitive flags require notice & explanation")

    DevelopmentRecord = {
        "model_id": ModelID,
        "author": DeveloperID,
        "timestamp": GetCurrentTime(),
        "justifications": Justification,
        "description": "White House AI Bill of Rights compliant parameter notice"
    }

    DOCUMENTATION_DATABASE.Append(DevelopmentRecord)
    RETURN SUCCESS
END FUNCTION
```

---

## Subfeature 3: Secure 5-Year Regulatory Ledger (EEOC Trail)

### Chosen Framework:
**Deontology (Integrity Audit Trail):**
Every candidate action processed generates a secure, ledger transaction block containing what data was used, how much weight was applied, and what the final outcome was. These records are kept for a minimum of five years and can be accessed during audits. This gives regulators like the EEOC a clear trail rather than a black box. Employers remain liable, and greater transparency enables regulators to litigate effectively and hold corporations accountable (Raghavan et al., 2020).

### Pseudocode (Raghavan et al., 2020):
```python
FUNCTION SecureScreeningDBLog(CandidateID, DataUsed, AppliedWeights, FinalDecision, CallerID):
    # Role-Based Access Control
    IF VerifyAccessLevel(CallerID) != REGULATORY_AUDITOR:
        LogSecurityViolation(CallerID)
        RETURN ERROR("Unauthorised Access Denied")

    Timestamp = GetCurrentTime()
    PrevBlock = LedgerDatabase.GetLatestBlock()

    Record = {
        "record_id": GenerateUniqueID(),
        "timestamp": Timestamp,
        "candidate": CandidateID,
        "data_used": DataUsed,
        "weights": AppliedWeights,
        "outcome": FinalDecision,
        "previous_hash": PrevBlock.Hash,
        "current_hash": ComputeSHA256(CandidateID, Timestamp, FinalDecision, PrevBlock.Hash)
    }

    LedgerDatabase.AppendOnlyInsert(Record)
    RETURN RECORD_PASSED
END FUNCTION
```

---

## 💻 Integrated Prototype Implementation: Faire compliance platform
This transparency system is fully implemented and interactive in our prototype **Faire** (see `index.html` and `README.md`):
- **Applicant View (Robert's Portal):** Submitting a resume triggers an immediate, plain-language notification detailing exactly which required skills are missing (e.g., React stack), fulfilling the duty of honesty.
- **Developer View (Arjun's Portal):** Scans neural model weights and blocks saving if sensitive graduation year attributes are present unless Arjun enters a written justification.
- **Auditor View (Elena's Portal):** Displays the immutable ledger in real-time. If Elena click 'Simulate Ledger Tamper', the block hash chain fails validation, and attempts by low-clearance roles to write or delete records trigger a security denial log.
