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
      "To place a bid, navigate to the auction page and enter your bid amount. Make sure youre logged in and your bid meets the minimum increment.",
  },
  {
    question: "What happens if I win an auction?",
    answer:
      "If you win an auction, youll be notified via email. Youll then need to complete the payment process and arrange for shipping or pickup of the item.",
  },
  {
    question: "Can I cancel a bid?",
    answer:
      "In most cases, bids cannot be cancelled. Please bid carefully and only when youre sure you want to purchase the item.",
  },
  {
    question: "How do I list an item for auction?",
    answer:
      'To list an item, go to your dashboard and click on "Create Auction". Fill in the details about your item, set your starting price, and choose the auction duration.',
  },
];

export const FAQSection = () => {
  return (
    <section className="py-12 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-2xl mx-auto"
        >
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
