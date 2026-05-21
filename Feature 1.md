# Feature 1: Automated Bias Audit Layer

Before any hiring software goes live, it passes through a multi-stage automated and human-centric audit pipeline. This protects candidates from implicit generational exclusions and ensures compliance across protected traits under federal guidelines.

---

## Subfeature 1: Baseline Data Auditing & Adversarial Debiasing

### Chosen Framework:
**Virtue Ethics (Algorithmic Diligence & Human Cooperation):**
Instead of passively accepting "anonymized" candidate datasets, the system demonstrates active algorithmic diligence. Anonymisation is tech-inadequate against AI pattern detection, which can easily infer protected traits through educational, historical, and linguistic proxies (Paz, 2025). This directly addresses the threat of proxy inference. We deploy a secondary, hostile "adversary" model to hunt for hidden correlation indexes. If the adversary succeeds in guessing protected traits (like age, gender, race), it proves the primary system is biased. Humans cooperate during this process by manually verifying, auditing, and pruning proxy variables, keeping humans accountable and at the core of the operation.

### Key Operations:
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
        FinalAuditedData = RouteToHumanAuditor(CleanedDataset, RemainingProxies)
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
```
Model Training complete 
   ➔ Run Demographic Parity Check 
   ➔ Rejection rate difference between groups > 5%? 
         ├── YES ➔ BLOCK save configs ➔ Adjust feature weights ➔ Retrain
         └── NO  ➔ CLEAR compile model builds ➔ Proceed to QA Testing
```

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
            LogWarning("Disparity gap exceeds threshold (5.0%). Readjusting parameter weights.")
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
