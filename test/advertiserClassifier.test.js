import test from "node:test";
import assert from "node:assert/strict";
import {
  classifyAdvertiser,
  descriptionBusinessEvidence,
  normalizeClassificationText,
} from "../src/collector/advertiserClassifier.js";

test("explicit Divar business evidence has the highest priority", () => {
  const result = classifyAdvertiser({
    type: "premium-panel", isBusiness: true, panelType: "premium-panel",
    hasBusinessReference: true,
    classificationSource: ["public-business-type", "public-business-reference-present"],
  }, "املاک تماس نگیرد");
  assert.equal(result.type, "real-estate-business");
  assert.equal(result.confidence, "high");
});

test("agency language can override a personal tag", () => {
  const samples = [
    "مشاور شما؛ برای بازدید تماس بگیرید",
    "مشاور تخصصی منطقه آماده پاسخگویی است",
    "کارشناس فروش ملک، کد فایل ۲۵",
    "فایل‌های مشابه در مجموعه املاک موجود است",
  ];
  for (const description of samples) {
    const result = classifyAdvertiser({
      type: "personal", isBusiness: false,
      classificationSource: ["public-business-type"],
    }, description);
    assert.equal(result.type, "real-estate-business", description);
    assert.equal(result.confidence, "medium", description);
    assert.equal(result.classificationSource.some((source) => source.startsWith("description-business-language:")), true);
  }
});

test("negative agency phrases do not create false business classifications", () => {
  const samples = [
    "فروش فوری؛ املاک تماس نگیرد",
    "لطفا مشاوران محترم زنگ نزنند",
    "بدون واسطه و مشاور",
    "به املاک پاسخ داده نمی شود",
    "همکاری با املاک ندارم",
  ];
  for (const description of samples) {
    const evidence = descriptionBusinessEvidence(description);
    const result = classifyAdvertiser({}, description);
    assert.deepEqual(evidence.matchedSignals, [], description);
    assert.equal(evidence.hasNegatedBusinessLanguage, true, description);
    assert.equal(result.type, "personal", description);
    assert.equal(result.classificationSource.includes("description-business-negation"), true, description);
  }
});

test("a separate real advisor introduction still wins after a negated phrase", () => {
  const result = classifyAdvertiser({}, "املاک تماس نگیرد؛ مشاور شما برای بازدید: علی");
  assert.equal(result.type, "real-estate-business");
  assert.equal(result.confidence, "medium");
});

test("Persian normalization handles Arabic glyphs, diacritics and half-spaces", () => {
  assert.equal(normalizeClassificationText("مُشاورِ شُما ـ آژانس‌املاك"), "مشاور شما آژانس املاک");
  assert.equal(classifyAdvertiser({}, "مُشاورِ شُما").type, "real-estate-business");
});

test("no explicit or description business evidence defaults to personal", () => {
  const result = classifyAdvertiser({}, "ملک شخصی، سند آماده انتقال");
  assert.equal(result.type, "personal");
  assert.equal(result.confidence, "low");
  assert.deepEqual(result.classificationSource, ["description-no-business-language"]);
});

test("description-derived classifications are stable on later migration passes", () => {
  for (const description of ["ملک شخصی سند آماده", "مشاور شما برای بازدید", "املاک تماس نگیرد"]) {
    const first = classifyAdvertiser({}, description);
    const second = classifyAdvertiser(first, description);
    assert.deepEqual(second, first, description);
  }
});
