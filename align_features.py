import os

def align_feature_1():
    print("Aligning Feature 1...")
    path = "Feature 1.md"
    if not os.path.exists(path):
        print(f"Error: {path} not found")
        return

    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Locate and update text before the image structures, or update everything up to the image definitions.
    # Let's rebuild the textual content of Feature 1.md beautifully while preserving the huge embedded image layers if they exist at the end.
    # Feature 1.md has embedded images under references like [image1]: data:image/png;base64,...
    # Let's extract the image reference section at the absolute bottom.
    image_indicators = []
    text_content = content
    for indicator in ["\n[image1]:", "\n[image2]:", "\n[image-1]:"]:
        if indicator in content:
            parts = content.split(indicator)
            text_content = parts[0]
            image_indicators.append(indicator + parts[1])
            break

    new_feature_1_text = """# Feature 1: Automated Bias Audit Layer

Before any hiring software goes live, it passes through a multi-stage automated and human audit pipeline. This ensures structural equity across protected traits, avoiding systematic discrimination.

---

## Subfeature 1: Baseline Data Auditing & Adversarial Debiasing

### Chosen Framework:
**Virtue Ethics (Algorithmic Diligence & Human Cooperation):**
Instead of passively accepting "anonymized" candidate datasets, the system demonstrates active algorithmic diligence. Anonymisation is technically inadequate against AI pattern detection, which can easily infer protected traits through educational, historical, and linguistic proxies (Paz, 2025). Hence, we deploy a secondary "Adversarial" AI model to hunt for hidden proxies. If the adversary succeeds in guessing protected traits (like age, gender, race), it proves the primary system is biased. Humans cooperate during this process by manually verifying, auditing, and pruning proxy variables, keeping humans accountable and at the core of the operation.

### Key Operations & Flowchart:
1. **Baseline Cleaning**: Strip explicit identifier fields (such as Age, Gender, Race) immediately upon database ingestion.
2. **Fairness Testing & Imbalance Detection**: Scan historical training pools using fairness testing libraries (Bird et al., 2020) to flag imbalances. If past hiring favoured younger applications, the model would learn and repeat that bias (BBC News, 2018).
3. **Adversarial proxy hunt (Yang et al., 2023)**: Train a secondary "adversary" model trying to guess candidate age. Automatically trigger neural penalty-retraining loops until guess accuracy drops to random rates (~50%), meaning proxies are uninformative.
4. **Human Auditing**: Route remaining proxy features to the developer workspace for manual pruning.

### Pseudocode (Yang et al., 2023 / Bird et al., 2020):
```python
FUNCTION BaselineAndAdversarialAudit(RawApplicantData, HistoricalData, SensitiveFields):
    # Step 1: Input & Clear Explicit Identifiers
    CleanedDataset = StripExplicitFields(RawApplicantData, SensitiveFields)

    # Step 2: Pre-Training Fairness Testing (Bird et al., 2020)
    HistoricalReport = FairnessLibrary.CheckImbalance(HistoricalData)
    IF HistoricalReport.HasBias():
        LogWarning("Bias Warning: Historical data favors younger applicants (BBC News, 2018)")

    # Step 3: Deploy Secondary Adversarial Classifier (Yang et al., 2023 / Paz, 2025)
    AdversaryModel = TrainAdversaryModel(CleanedDataset)
    GuessingAccuracy = AdversaryModel.TestGuessingProtectedTraits(CleanedDataset)

    # Step 4: Adversarial Retraining Loops
    WHILE GuessingAccuracy > 55.0%:  # 50% is pure random guessing (uninformative proxies)
        CleanedDataset = RetrainWithAdversarialPenalty(CleanedDataset, AdversaryModel)
        GuessingAccuracy = AdversaryModel.TestGuessingProtectedTraits(CleanedDataset)

    # Step 5: Human Cooperation Audit Gate
    RemainingProxies = AdversaryModel.IdentifyTopCorrelations(CleanedDataset)
    IF RemainingProxies IS NOT EMPTY:
        FinalAuditedData = RouteToHumanReviewer(CleanedDataset, RemainingProxies)
    ELSE:
        FinalAuditedData = CleanedDataset

    RETURN FinalAuditedData
END FUNCTION
```

---

## Subfeature 2: Impartial Model Training & Parity Testing

### Chosen Framework:
- **Deontology (Strict Mathematical Thresholds):** During model training, we enforce a strict, unbypassable rule that the selection/rejection rate gap between any two demographic groups cannot exceed 5.0% (EEOC, 2023 guidelines). Actively prevents disproportionate harm seen in historically biased hiring.
- **Utilitarianism (Maximize Utility):** Continuously retrain and optimize features using hyperparameter search libraries to discover the model with maximum organizational accuracy and skills matching while satisfying the 5% fairness constraint.

### Flowchart:
(Model Training complete -> Parity Check -> Gap > 5%? -> YES -> Retrain and Adjust Weights -> NO -> Cleared)

### Pseudocode (EEOC, 2023 Guidelines):
```python
FUNCTION ImpartalModelTraining(AuditedData):
    DO:
        # Train & Optimize Model to Maximize Utility (Utilitarianism)
        Model = TrainModelHyperparameters(AuditedData, Method = RandomSearchCV)

        # Enforce Deontological Strict Threshold (EEOC, 2023)
        DisparityGap = CalculateRejectionDisparityGap(Model, AuditedData)

        IF DisparityGap > 5.0%:
            # Retunes weights on graduating years and experience proxies
            AuditedData = AdjustFeatureWeights(AuditedData)
            IsCompliant = FALSE
        ELSE:
            IsCompliant = TRUE

    WHILE NOT IsCompliant

    RETURN Model
END FUNCTION
```

---

## Subfeature 3: Manual Rules Check & Post-Deployment Audit

### Chosen Framework:
**Virtue Ethics (Continuous Human Vigilance):**
In the iTutorGroup case, the age filter was not a machine learning model flaw; it was a manually written, hardcoded rule (EEOC, 2023). To address this, Faire parses manual company filters separately, requiring human compliance signoff. Furthermore, we implement post-deployment monitoring (Hunton, 2025) using a live dashboard to track drift and trigger alarms if demographic selection gaps widen after release.

### Pseudocode (Hunton, 2025 / EEOC, 2023):
```python
FUNCTION FinalAndContinuousAudit(TrainedModel, CompanyRules, LiveHiringPool):
    # Step 1: Scan and Approve Manual Hardcoded Rules (EEOC, 2023)
    FOR EACH rule IN CompanyRules:
        RiskAnalysis = ScanForImplicitAgeism(rule)
        IF RiskAnalysis.Risk == HIGH:
            FlagRuleForReviewerSarah(rule)
            BLOCK_DEPLOYMENT("Illegal hardcoded age-filter detected!")
            RETURN NULL

    # Step 2: Final Automated Full-Pipeline Testing
    PipelineScore = FairnessLibrary.TestModel(TrainedModel)
    IF PipelineScore.HasBias():
        BLOCK_DEPLOYMENT("Pipeline bias detected")
        RETURN NULL

    # Step 3: Post-Deployment Drift Audit (HUNTON, 2025)
    LiveDisparityGap = TrackLiveRejections(LiveHiringPool)
    IF LiveDisparityGap > 5.0%:
        TriggerContinuousAlarm(Sarah_Oversight_Reviewer)
        RollbackSystemToPreviousState()
        RETURN FAILED

    RETURN CLEARED_AND_ACTIVE
END FUNCTION
```

---

## 💻 Integrated Prototype Implementation: Faire compliance platform
This automated bias audit layer is fully implemented and interactive in our prototype **Faire** (see `index.html` and `README.md`):
- **Adversarial Proxy Hunter (Subfeature 1):** In *Developer View*, Arjun can scan training pools. Faire's adversarial module flags graduation year as an age-demographic proxy and prompts him to prune the element.
- **Parity Guard Gate (Subfeature 2):** In *Developer View*, Arjun can run model training weights. If the selection gap exceeds 5%, Faire blocks compiling and saving, prompting Arjun to adjust sliders and weights until standard parity is met.
- **AI Bias Checks (Subfeature 3):** Audits manual rules and routes evaluations to compliance reviewers.

"""

    # Reconnect image definitions if they existed
    output = new_feature_1_text
    if image_indicators:
        output += "\n" + "\n".join(image_indicators)

    with open(path, "w", encoding="utf-8") as f:
        f.write(output)
    print("Feature 1 aligned successfully.")

def align_feature_2():
    print("Aligning Feature 2...")
    path = "Feature 2.md"
    if not os.path.exists(path):
        print(f"Error: {path} not found")
        return

    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    new_feature_2_text = """# Feature 2: Transparency System

This system provides complete public, developer, and regulatory transparency to rebuild trust and prove legal due diligence in automated recruitment.

---

## Subfeature 1: Impartial Candidate Feedback (Duty of Honesty)

### Chosen Framework:
**Deontology (Absolute Duty of Honesty & Disclosure):**
Faire directly addresses the iTutorGroup age-bias case, where over 200 older candidates were auto-rejected without notice and without knowing that an age filter existed. Research shows transparent feedback significantly improves candidates' perceptions of fairness (Sánchez-Monedero et al., 2025). Failing to disclose explanations makes decisions feel random, which destroys corporate trust and leaves people confused (Bhattacharya & Verbert, 2025). Faire publishes criteria transparently before submissions, and if candidate resumes are rejected, it automatically delivers a jargon-free email summary showing the exact miss and what tech skills are missing.

### Pseudocode (Sánchez-Monedero et al., 2025):
```python
FUNCTION EvaluateAndInformCandidate(Resume, JobCriteria, CandidateEmail, CandidateAge):
    # Step 1: Pre-Submission Disclosure
    DisplayJobCriteriaPublicly(JobCriteria) # Pre-submission notice

    # Step 2: Impartial Skills Evaluation
    SkillsMissing = Model.CompareSkills(Resume, JobCriteria)

    IF SkillsMissing IS EMPTY:
        TriggerSuccessNotice(CandidateEmail)
    ELSE:
        # Deontological Duty of Honesty & Plain Feedback (Bhattacharya et al., 2025)
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

"""

    with open(path, "w", encoding="utf-8") as f:
        f.write(new_feature_2_text)
    print("Feature 2 aligned successfully.")

def align_feature_3():
    print("Aligning Feature 3...")
    path = "Feature 3.md"
    if not os.path.exists(path):
        print(f"Error: {path} not found")
        return

    new_feature_3_text = """# Feature 3: Policy Compliance Process

Ensuring structural accountability by establishing mandatory checklists and separating compliance personnel from the core development team.

---

## Subfeature 1: Three-Stage Checkpoints and Reviewer Sign-offs

### Chosen Framework:
**Deontology (Responsibility & Legal Obedience):**
Faire establishes a joint gatekeeping checkpoint pipeline. A designated compliance reviewer (Sarah), separate from the development team, validates planned specs before development starts, audits code builds before testing, and issues final sign-offs before deployment. Employers remain liable for algorithmic discrimination even if built by third-party vendors (LegalClarity, 2025). In the iTutorGroup case, the age filter was coded without any reviewer stopping it. This process formalizes what the EEOC is voluntarily asking employers to do—asking third parties what metrics they use to assess adverse impact (Mayer Brown, 2024)—creating documented proof of due diligence at every stage.

### The Three Checkpoints Checklists:
1. **Checkpoint 1 (Pre-Development specs)**: Checksplanned software feature Specifications against employment laws (EEOC, ADEA guidelines). For example, a reviewer like ProPublica would instantly catch and remove manual age filters before a single line of code is written.
2. **Checkpoint 2 (Pre-Testing built system)**: Checks fairness testing matrices, scans parameter justifications, and verifies selection rates are below the 5% gap.
3. **Checkpoint 3 (Pre-Deployment clearance)**: Final review checkpoint. Blocks deployment unless the compliance reviewer grants clearance sign-off keys.

### Pseudocode (Mayer Brown, 2024 / LegalClarity, 2025):
```python
# Checkpoint 1 specs check
FUNCTION PreDevelopmentAudit(PlannedFeaturesList, ReviewerID):
    IF IsPersonnelCoreDeveloper(ReviewerID) == TRUE:
        RETURN ERROR("Audit Block: Reviewer must be separate from development team")

    FOR EACH feature IN PlannedFeaturesList:
        IsViolative = VerifyLegalFrameworks(feature, rules = ["ADEA", "EEOC"])
        IF IsViolative == True:
            FlagFeatureAlert(feature)
            BLOCK_PROGRESS("Illegal feature specification detected!")
            RETURN FAILED

    SignoffCheckpoint1(ReviewerID)
    RETURN APPROVED
END FUNCTION

# Checkpoint 2 testing audit
FUNCTION PreTestingAudit(ModelDataWeights, ReviewerID):
    IF ModelDataWeights.CalculateDemographicGap() > 5.0%:
         BLOCK_TESTING("Disparity rate exceeds boundary 5% limit!")
         RETURN FAILED

    SignoffCheckpoint2(ReviewerID)
    RETURN APPROVED
END FUNCTION

# Checkpoint 3 deploy gate
FUNCTION PreDeploymentClearance(SystemBuild, ReviewerID):
    HasSignoff1 = Checkpoint1.IsApproved()
    HasSignoff2 = Checkpoint2.IsApproved()
    HasOfficerKey = ReviewerID.SignDeploymentPermission()

    IF NOT (HasSignoff1 AND HasSignoff2 AND HasOfficerKey):
        BLOCK_DEPLOYMENT("Deploy blocked: designated compliance sign-off pending!")
        RETURN FAILED
    ELSE:
        CLEAR_PRODUCTION_RELEASE()
        RETURN SUCCESS
END FUNCTION
```

---

## 💻 Integrated Prototype Implementation: Faire compliance platform
This feature is implemented and brought to life in our interactive prototype **Faire** (see `index.html` and `README.md`).
- **Sarah (Compliance Reviewer View)** interacts directly with this system:
  1. She audits proposed specifications in Checkpoint 1, catching and pruning the age-filtering code.
  2. She reviews fairness metrics in Checkpoint 2.
  3. She provides the digital sign-off key in Checkpoint 3 to safely deploy the system.
- **Arjun (Developer View)** gets blocked from deploying the neural model if Sarah has not checked the checkpoints, proving the deontology checks are unbypassable.

"""

    with open(path, "w", encoding="utf-8") as f:
        f.write(new_feature_3_text)
    print("Feature 3 aligned successfully.")

if __name__ == "__main__":
    align_feature_1()
    align_feature_2()
    align_feature_3()
    print("All feature files aligned perfectly with details.")
