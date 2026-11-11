import Link from "next/link";
import { PolicyPage, PolicySection } from "@/components/PolicyPage";
import { storeInfo } from "@/lib/store-info";

export const metadata = { title: "კონტაქტი | Sheakete", description: "დაუკავშირდით Sheakete-ს შეკვეთის, მიწოდების, დაბრუნებისა და მონაცემებთან დაკავშირებულ საკითხებზე." };

export default function ContactPage() {
  return (
    <PolicyPage title="დაგვიკავშირდით" introduction="შეკვეთის, პროდუქტის, მიწოდების ან დაბრუნების შესახებ კითხვებისთვის დაუკავშირდით Sheakete-ს.">
      <PolicySection title="საკონტაქტო ინფორმაცია">
        <address className="space-y-3 not-italic">
          <p>მაღაზია: {storeInfo.name}</p>
          <p>ელფოსტა: <a href={`mailto:${storeInfo.email}`} className="inline-flex min-h-11 items-center">{storeInfo.email}</a></p>
          <p>ტელეფონი: <a href={storeInfo.phoneHref} className="inline-flex min-h-11 items-center">{storeInfo.phone}</a></p>
          <p>მისამართი: {storeInfo.address}</p>
        </address>
        <p>თუ ადგილზე მისვლა ან ნივთის დაბრუნება გსურთ, წინასწარ შეგვითანხმეთ დრო და გადაცემის ადგილი.</p>
      </PolicySection>
      <PolicySection title="შეკვეთასთან დაკავშირებული საკითხი">
        <p>მოგვაწოდეთ თქვენი სახელი, შეკვეთისას გამოყენებული ტელეფონის ნომერი და პროდუქტის დასახელება, რომ შესაბამისი განაცხადი მოვძებნოთ. საბანკო ბარათის სრული მონაცემები ან პაროლები არ გამოგვიგზავნოთ.</p>
        <p>შეგიძლიათ წინასწარ გაეცნოთ <Link href="/shipping">მიწოდების პირობებს</Link>, <Link href="/returns">დაბრუნების წესებს</Link> და <Link href="/privacy">კონფიდენციალურობის პოლიტიკას</Link>.</p>
      </PolicySection>
    </PolicyPage>
  );
}
