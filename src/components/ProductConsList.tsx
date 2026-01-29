import React from "react";

const ProductConsList = ({ cons }: { cons: string[] }) => {
  return (
    <div>
      <div>
        <ul>
          {/* <li>✅ორი თავი კომპლექტში - (20მმ/25მმ)-იან მილებთან სამუშაოდ</li>
          <li>✅ამოჭერი მილი ორივე მხრიდან სწრაფად და სუფთად</li>
          <li>✅ერგება ყველანაირ ელექტრო დრელს</li>
          <li>✅გამოდგება ნებისმიერი სახლის საქმიანობისთვის</li>
          <li>✅დამზადებულია უმაღლესი ხარისხის ლითონისგან</li> */}
          {cons.map((con) => (
            <li>✅{con}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductConsList;
