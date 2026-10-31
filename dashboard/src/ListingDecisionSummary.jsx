import { Icon, formatMoney, formatNumber } from "./shared.jsx";
import { getComparablePrice, getListingHighlights } from "./decisionSummary.js";
import "./ListingDecisionSummary.css";

const statuses = {
  active: "فعال",
  "not-seen": "دیده‌نشده",
  "possibly-removed": "احتمال حذف",
  removed: "حذف‌شده",
};
const dateFormat = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Tehran",
});

function formatDate(value) {
  if (!value) return "نامشخص";
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? "نامشخص" : dateFormat.format(date);
}

export default function ListingDecisionSummary({
  listing,
  scoreDetail,
  scoreLoading,
}) {
  const { highlights, missing } = getListingHighlights(listing);
  const comparison = getComparablePrice(scoreDetail);
  const direction =
    comparison && Math.abs(comparison.percent) >= 0.05
      ? comparison.percent > 0
        ? "بالاتر"
        : "پایین‌تر"
      : null;

  return (
    <section
      className="listing-decision"
      aria-labelledby="listing-decision-title"
    >
      <div className="listing-decision__heading">
        <div>
          <span className="listing-decision__eyebrow">نگاه سریع</span>
          <h2 id="listing-decision-title">خلاصه بررسی آگهی</h2>
        </div>
        <a href="#owj-specs">
          مشخصات کامل <Icon name="back" size={15} />
        </a>
      </div>

      <dl className="listing-decision__facts">
        <div>
          <dt>قیمت کل</dt>
          <dd>{formatMoney(listing.pricing?.price)}</dd>
        </div>
        <div>
          <dt>قیمت هر متر</dt>
          <dd>{formatMoney(listing.pricing?.pricePerMeter)}</dd>
        </div>
        <div>
          <dt>وضعیت آگهی</dt>
          <dd>{statuses[listing.lifecycle?.status] || "نامشخص"}</dd>
        </div>
        <div>
          <dt>آخرین مشاهده آگهی</dt>
          <dd>{formatDate(listing.lastSeenAt)}</dd>
        </div>
      </dl>

      <div className="listing-decision__columns">
        <div className="listing-decision__column">
          <h3>
            <Icon name="alert" size={17} /> نکات قابل توجه
          </h3>
          {highlights.length > 0 ? (
            <ul className="listing-decision__notes">
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>مورد مشخصی از اطلاعات موجود شناسایی نشد.</p>
          )}
          {missing.length > 0 && (
            <p className="listing-decision__missing">
              <strong>اطلاعات نامشخص:</strong> {missing.join("، ")}
            </p>
          )}
        </div>
        <div className="listing-decision__column listing-decision__comparison">
          <h3>
            <Icon name="trend" size={17} /> مقایسه قیمت هر متر
          </h3>
          {scoreLoading ? (
            <p role="status">در حال دریافت تحلیل قیمت…</p>
          ) : comparison ? (
            <>
              <p className="listing-decision__result">
                {direction ? (
                  <>
                    <strong>
                      {formatNumber(
                        Math.round(Math.abs(comparison.percent) * 10) / 10,
                      )}
                      ٪ {direction}
                    </strong>{" "}
                    از مبنای نمونه‌ها
                  </>
                ) : (
                  <strong>تقریباً برابر با مبنای نمونه‌ها</strong>
                )}
              </p>
              <p>
                قیمت هر متر آگهی در زمان تحلیل:{" "}
                <b>{formatMoney(comparison.asking)}</b>
              </p>
              <p>
                میانه وزنی تعدیل‌شده نمونه‌ها:{" "}
                <b>{formatMoney(comparison.reference)}</b>
              </p>
              {direction && (
                <p>
                  اختلاف هر متر:{" "}
                  <b>{formatMoney(Math.abs(comparison.difference))}</b>
                </p>
              )}
              <small>
                بر اساس {formatNumber(comparison.sampleCount)} آگهی مشابه در
                تحلیل {formatDate(scoreDetail.generatedAt)}. قیمت‌ها
                پیشنهادی‌اند، نه قیمت معامله قطعی؛ مبنای مقایسه برای تفاوت
                ویژگی‌های ملک تعدیل شده است.
              </small>
              <a href="#owj-comparables">
                مشاهده نمونه‌ها <Icon name="back" size={14} />
              </a>
            </>
          ) : (
            <p>تحلیل قیمت با حداقل ۵ نمونه مشابه معتبر در دسترس نیست.</p>
          )}
        </div>
      </div>
    </section>
  );
}
