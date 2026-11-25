import React from "react";
import {
  FiFileText,
  FiShield,
  FiShoppingBag,
  FiCreditCard,
  FiTruck,
  FiRefreshCw,
  FiUser,
  FiAlertCircle,
  FiGlobe,
  FiMail,
  FiChevronRight,
  FiCheckCircle,
} from "react-icons/fi";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 mb-20">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300">
            <FiFileText className="text-blue-400" />
            Store terms & conditions
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Terms of Service
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                These terms explain the rules for using our store, placing
                orders, making payments, and accessing our services. Please
                review them before making a purchase.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <FiFileText className="text-blue-400" />
                Last updated: November 2, 2026
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                By accessing or using our website, you agree to these Terms of
                Service and any applicable policies referenced here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="mx-auto -mt-8 max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 text-xl text-blue-600">
              <FiShoppingBag />
            </div>
            <h2 className="font-semibold">Shopping with confidence</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Understand how orders are placed and accepted.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600/10 text-xl text-indigo-600">
              <FiCreditCard />
            </div>
            <h2 className="font-semibold">Clear payments</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Review pricing, taxes, and payment requirements.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 text-xl text-blue-600">
              <FiTruck />
            </div>
            <h2 className="font-semibold">Delivery information</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Learn about shipping estimates and delivery limitations.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600/10 text-xl text-indigo-600">
              <FiRefreshCw />
            </div>
            <h2 className="font-semibold">Returns & refunds</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Check the conditions for returns and eligible refunds.
            </p>
          </div>
        </div>
      </section>

      {/* Terms content */}
      <main className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-12">
        {/* Sidebar */}
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 lg:sticky lg:top-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            On this page
          </h2>

          <nav className="mt-5 space-y-1">
            <a href="#acceptance" className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-blue-600">
              Acceptance of Terms <FiChevronRight />
            </a>
            <a href="#eligibility" className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-blue-600">
              Eligibility & Accounts <FiChevronRight />
            </a>
            <a href="#products" className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-blue-600">
              Products & Availability <FiChevronRight />
            </a>
            <a href="#orders" className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-blue-600">
              Orders & Payments <FiChevronRight />
            </a>
            <a href="#shipping" className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-blue-600">
              Shipping & Delivery <FiChevronRight />
            </a>
            <a href="#returns" className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-blue-600">
              Returns & Refunds <FiChevronRight />
            </a>
            <a href="#conduct" className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-blue-600">
              Acceptable Use <FiChevronRight />
            </a>
            <a href="#liability" className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-blue-600">
              Liability & Disputes <FiChevronRight />
            </a>
            <a href="#contact" className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-blue-600">
              Contact Us <FiChevronRight />
            </a>
          </nav>

          <div className="mt-8 rounded-xl bg-slate-100 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <FiMail className="text-blue-600" />
              Need assistance?
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Contact our support team if you have questions about these terms.
            </p>
            <a
              href="mailto:support@example.com"
              className="mt-3 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              support@example.com
            </a>
          </div>
        </aside>

        {/* Main terms */}
        <div className="space-y-6">
          <section id="acceptance" className="scroll-mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-lg text-blue-600">
                <FiFileText />
              </span>
              <h2 className="text-xl font-bold sm:text-2xl">1. Acceptance of Terms</h2>
            </div>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-500 sm:text-base">
              <p>
                These Terms of Service (“Terms”) govern your access to and use
                of [Your Store Name] at [Your Website URL], including all
                content, features, and services provided through the website.
              </p>
              <p>
                By visiting our website, creating an account, or placing an
                order, you agree to be bound by these Terms. If you do not agree,
                please do not use our website or services.
              </p>
            </div>
          </section>

          <section id="eligibility" className="scroll-mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/10 text-lg text-indigo-600">
                <FiUser />
              </span>
              <h2 className="text-xl font-bold sm:text-2xl">2. Eligibility & Accounts</h2>
            </div>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-500 sm:text-base">
              <p>
                You must be legally capable of entering into a binding agreement
                under the laws that apply to you to use this website and make
                purchases.
              </p>
              <p>
                If you create an account, you are responsible for providing
                accurate information, maintaining the confidentiality of your
                credentials, and all activity conducted through your account.
              </p>
              <p>
                You must notify us promptly if you believe your account has
                been accessed without authorization. We may suspend or terminate
                accounts that violate these Terms or applicable law.
              </p>
            </div>
          </section>

          <section id="products" className="scroll-mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-lg text-blue-600">
                <FiShoppingBag />
              </span>
              <h2 className="text-xl font-bold sm:text-2xl">3. Products & Availability</h2>
            </div>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-500 sm:text-base">
              <p>
                We make reasonable efforts to display product descriptions,
                images, prices, and availability accurately. However, colors
                and appearance may vary depending on your display, and errors
                may occasionally occur.
              </p>
              <p>
                Product listings and availability may change without notice.
                We reserve the right to limit quantities, discontinue products,
                or correct listing errors, subject to applicable law.
              </p>
            </div>
          </section>

          <section id="orders" className="scroll-mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/10 text-lg text-indigo-600">
                <FiCreditCard />
              </span>
              <h2 className="text-xl font-bold sm:text-2xl">4. Orders & Payments</h2>
            </div>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-500 sm:text-base">
              <p>
                Placing an order is an offer to purchase the selected products.
                An order confirmation does not necessarily mean that we have
                accepted the order. We may accept or decline an order in
                accordance with applicable law.
              </p>
              <p>
                Prices are displayed in the currency indicated at checkout and
                may exclude shipping, taxes, duties, or other charges unless
                expressly stated otherwise. The total payable amount will be
                shown before you complete your purchase.
              </p>
              <p>
                You authorize us and our payment service providers to process
                the payment method you select for the amount shown at checkout.
                Orders may be cancelled or refunded if payment cannot be
                authorized or processed.
              </p>
            </div>
          </section>

          <section id="shipping" className="scroll-mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-lg text-blue-600">
                <FiTruck />
              </span>
              <h2 className="text-xl font-bold sm:text-2xl">5. Shipping & Delivery</h2>
            </div>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-500 sm:text-base">
              <p>
                Shipping options, fees, and estimated delivery times will be
                presented during checkout or in our shipping policy. Delivery
                estimates are not guaranteed unless expressly stated.
              </p>
              <p>
                Delays may occur due to carrier issues, weather, customs,
                incorrect address information, or circumstances beyond our
                reasonable control. You are responsible for providing a
                complete and accurate delivery address.
              </p>
              <p>
                Any risk of loss or transfer of title will be determined by
                applicable law and the shipping terms communicated at purchase.
              </p>
            </div>
          </section>

          <section id="returns" className="scroll-mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/10 text-lg text-indigo-600">
                <FiRefreshCw />
              </span>
              <h2 className="text-xl font-bold sm:text-2xl">6. Returns, Exchanges & Refunds</h2>
            </div>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-500 sm:text-base">
              <p>
                Returns, exchanges, and refunds are subject to our applicable
                return and refund policy, which forms part of these Terms.
                Please review that policy before making a purchase.
              </p>
              <p>
                Certain products may be excluded from return where permitted
                by law. Refund timing may depend on the payment provider and
                financial institution.
              </p>
              <p>
                Nothing in these Terms limits consumer rights that cannot
                legally be excluded or restricted.
              </p>
            </div>
          </section>

          <section id="conduct" className="scroll-mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-lg text-blue-600">
                <FiShield />
              </span>
              <h2 className="text-xl font-bold sm:text-2xl">7. Acceptable Use</h2>
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-500 sm:text-base">
              You agree not to:
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-500 sm:text-base">
              <li className="flex gap-3"><FiCheckCircle className="mt-1 shrink-0 text-blue-600" /> Use the website for unlawful, fraudulent, or misleading purposes.</li>
              <li className="flex gap-3"><FiCheckCircle className="mt-1 shrink-0 text-blue-600" /> Interfere with the security, availability, or operation of the store.</li>
              <li className="flex gap-3"><FiCheckCircle className="mt-1 shrink-0 text-blue-600" /> Attempt unauthorized access to accounts, systems, or data.</li>
              <li className="flex gap-3"><FiCheckCircle className="mt-1 shrink-0 text-blue-600" /> Upload malicious code or misuse forms, reviews, or other website features.</li>
              <li className="flex gap-3"><FiCheckCircle className="mt-1 shrink-0 text-blue-600" /> Copy or use website content in violation of intellectual property rights.</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/10 text-lg text-indigo-600">
                <FiGlobe />
              </span>
              <h2 className="text-xl font-bold sm:text-2xl">8. Intellectual Property</h2>
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-500 sm:text-base">
              Unless otherwise stated, the website and its content—including
              text, graphics, logos, product images, design, and software—are
              owned by or licensed to [Your Store Name] and are protected by
              applicable intellectual property laws. You may use the website
              for personal, non-commercial shopping purposes only.
            </p>
          </section>

          <section id="liability" className="scroll-mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-lg text-blue-600">
                <FiAlertCircle />
              </span>
              <h2 className="text-xl font-bold sm:text-2xl">9. Disclaimers & Liability</h2>
            </div>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-500 sm:text-base">
              <p>
                To the extent permitted by law, our website and services are
                provided “as is” and “as available.” We do not guarantee
                uninterrupted, error-free, or secure access at all times.
              </p>
              <p>
                To the extent permitted by applicable law, [Your Store Name]
                will not be liable for indirect, incidental, special, or
                consequential damages arising from your use of the website or
                products purchased through it.
              </p>
              <p>
                These Terms do not exclude or limit liability where such
                exclusion or limitation is prohibited by law.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold sm:text-2xl">10. Changes & Governing Law</h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-500 sm:text-base">
              <p>
                We may update these Terms from time to time. Changes will be
                posted on this page with an updated revision date. Your
                continued use of the website after changes take effect means
                you accept the revised Terms, to the extent permitted by law.
              </p>
              <p>
                These Terms are governed by the laws applicable in
                [Your Jurisdiction], without regard to conflict-of-law
                principles. Any disputes will be handled by the competent
                courts or dispute-resolution process required by applicable law.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="scroll-mt-8 overflow-hidden rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-blue-400">
                  <FiMail />
                  Customer support
                </div>
                <h2 className="mt-3 text-2xl font-bold">Need clarification?</h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                  Contact us if you have questions about these Terms or your
                  shopping experience.
                </p>
              </div>
              <a
                href="mailto:support@example.com"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Contact support <FiChevronRight />
              </a>
            </div>
          </section>
        </div>
      </main>

    </div>
  );
};

export default TermsOfService;