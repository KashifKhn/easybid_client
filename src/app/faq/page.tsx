import { PageHero } from "@/components/PageHero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I place a bid?",
    answer:
      "To place a bid, navigate to the auction page and enter your bid amount. Make sure you're logged in and your bid meets the minimum increment.",
  },
  {
    question: "What happens if I win an auction?",
    answer:
      "If you win an auction, you'll be notified via email. You'll then need to complete the payment process and arrange for shipping or pickup of the item.",
  },
  {
    question: "Can I cancel a bid?",
    answer:
      "In most cases, bids cannot be cancelled. Please bid carefully and only when you're sure you want to purchase the item.",
  },
  {
    question: "How do I list an item for auction?",
    answer:
      "To list an item, go to your dashboard and click on 'Create Auction'. Fill in the details about your item, set your starting price, and choose the auction duration.",
  },
  {
    question: "What fees does EasyBid charge?",
    answer:
      "EasyBid charges a small percentage of the final sale price as a commission. The exact percentage may vary depending on the item category and final sale price. Please check our pricing page for more details.",
  },
  {
    question: "How is shipping handled?",
    answer:
      "Shipping arrangements are typically made between the buyer and seller after an auction ends. Sellers should clearly state their shipping terms in the item description.",
  },
  {
    question: "What if I receive an item that doesn't match the description?",
    answer:
      "If you receive an item that significantly differs from its description, please contact our customer support team immediately. We have a dispute resolution process to handle such situations.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach our customer support team through the 'Contact Us' page on our website, or by emailing support@easybid.com. We aim to respond to all inquiries within 24 hours.",
  },
];

export default function FAQPage() {
  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about using EasyBid"
      />
      <div className="container mx-auto px-4 py-8">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}
