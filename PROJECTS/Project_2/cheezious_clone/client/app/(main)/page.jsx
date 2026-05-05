import Link from "next/link";
import MenuCard from "../components/ui/MenuCard";
import Image from "next/image";
import SubscribeForm from "../components/ui/SubscribeForm";
export default function Home() {
  return (
    <>
      <Image
        src="/PSLWebBannerSouth.jpg"
        className="w-full h-auto object-cover object-center"
        width={0}
        height={0}
        sizes="100vw"
        alt="PSL Banner"
      />
      <div className="w-4/5 m-auto mt-20">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Explore Menu</h1>
          <Link href="/menu" className="text-red-600 font-bold">
            VIEW ALL
          </Link>
        </div>
        <div className="flex gap-6 overflow-x-auto mt-7" id="carousel">
          <MenuCard image="/Zalmi-meal.jpg" name="ZALMI MEAL" />
          <MenuCard image="/Malai-Tikka.png" name="MALAI TIKKA" />
          <MenuCard image="/Thin-Crust-Pizza.jpg" name="THIN CRUST PIZZA" />
          <MenuCard image="/Starter.jpg" name="STARTERS" />
          <MenuCard image="/Somewhat-Local.jpg" name="SOMEWHAT LOCAL" />
          <MenuCard image="/Somewhat-Sooper.jpg" name="SOMEWHAT SOOPER" />
          <MenuCard image="/Addons.jpg" name="ADDONS" />
          <MenuCard image="/Soft-Drinks.jpg" name="SOFT DRINKS" />
        </div>
      </div>
      <div className="w-4/5 flex gap-4 mx-auto mt-20 flex-wrap justify-center items-center">
        <div className="w-80">
          <div className="w-full h-auto overflow-hidden rounded-lg">
            <Image
              src="/delivery-1.jpg"
              alt="Delivery"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-90"
            />
          </div>
          <h1 className="text-3xl font-medium mt-4">
            Delivering cheezy khushiyan
          </h1>
        </div>
        <div className="w-80">
          <div className="w-full h-auto overflow-hidden rounded-lg">
            <Image
              src="/year-award.jpg"
              alt="Year Award"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-90"
            />
          </div>
          <h1 className="text-3xl font-medium mt-4">
            Fastest Growing Brand of the Year
          </h1>
        </div>
        <div className="w-80">
          <div className="w-full h-auto overflow-hidden rounded-lg">
            <Image
              src="/local-flavor.jpg"
              alt="Local Flavor"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-90"
            />
          </div>
          <h1 className="text-3xl font-medium mt-4">
            Made with fresh, local ingredients and love
          </h1>
        </div>
      </div>
      <div className="bg-[url('/Mobile-App.png')] w-[90%] h-120 bg-no-repeat bg-center bg-contain m-auto mt-44 flex justify-end items-center max-lg:bg-none max-lg:h-auto max-lg:justify-center max-lg:gap-2 max-sm:flex-col">
        <Image
          src="/mobile.png"
          className="w-full h-auto lg:hidden"
          width={0}
          height={0}
          sizes="100vw"
          alt="Mobile Image"
        />
        <div className="w-180 mt-8 max-sm:mt-0 max-sm:w-full max-sm:mb-10">
          <h1 className="text-3xl font-bold max-sm:text-center max-sm:text-2xl">
            Download Our Mobile App
          </h1>
          <p className="text-2xl max-sm:text-center max-sm::text-lg">
            Elevate your experience by downloading our mobile app for Seamless
            ordering experience.
          </p>
          <div className="flex justify-start gap-10 mt-6 max-lg:flex-col max-lg:items-center max-lg:gap-2">
            <Image
              src="/People.png"
              width={0}
              height={0}
              sizes="100vw"
              className="w-80 h-auto"
              alt="people"
            />
            <div className="flex justify-center items-center gap-1">
              <Link href="#">
                <Image
                  src="/Google-Play.png"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-32 mt-4"
                  alt="Google Play"
                />
              </Link>
              <Link href="#">
                <Image
                  src="/App-Store.png"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-32 mt-4"
                  alt="App Store"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-4/5 m-auto flex justify-between items-center mb-40 mt-6 max-sm:mb-10">
        <h1 className="text-3xl font-bold">Blogs</h1>
        <Link href="/blogs" className="text-red-600 font-bold">
          VIEW ALL
        </Link>
      </div>
      <div className="bg-[url('/lets-talk-cheezy.svg')] w-full h-120 bg-contain bg-no-repeat bg-center pt-36 pl-20 mb-40 max-lg:bg-none max-lg:h-auto max-lg:pt-0 max-lg:pl-0 max-lg:flex max-lg:flex-col max-lg:w-1/2 max-lg:mx-auto max-lg:gap-6">
        <h1 className="text-4xl text-red-500 font-bold lg:max-w-70 max-lg:text-3xl">
          Special Offer & News
        </h1>
        <p className="text-3xl max-w-2xl font-light text-gray-800 max-lg:text-base">
          Subscribe now for news, promotions and more delivered right to your
          inbox
        </p>
        <SubscribeForm />
      </div>
      <Link
        href="/menu"
        className=" fixed z-5 bottom-12 right-16 bg-orange-600 text-white font-bold px-3 py-2 rounded-md max-sm:right-2"
      >
        ORDER NOW
      </Link>
    </>
  );
}
