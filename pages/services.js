import servicesData from '@/data/servicesData'
import { PageSEO } from '@/components/SEO'
import Card from '@/components/Card'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import Image from '@/components/Image'

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Services() {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Services
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Building expertise in-house takes time and resources. I can help you get started much
            faster.
          </p>
        </div>
        {/* Trusted by top companies section */}
        <div className="py-8 ">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 text-center mb-10">
            Trusted by top companies
          </h2>
          <div className="flex justify-center items-center gap-x-12 mt-4">
            <Image
              src="/logos/postman.png"
              alt="Postman Logo"
              className="grayscale"
              width={200}
              height={80}
            />
            <Image
              src="/logos/hdi.png"
              alt="HDI Logo"
              className="grayscale"
              width={197}
              height={80}
            />
            <Image
              src="/logos/sap.png"
              alt="SAP Logo"
              className="grayscale"
              width={147}
              height={80}
            />
          </div>
        </div>
        <div className="container py-12">
          <div className="flex flex-wrap -m-4">
            {servicesData.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
                price={d.price}
                priceDetails={d.priceDetails}
              />
            ))}
          </div>
        </div>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Prices do not include travel expenses.
        </p>
      </div>
    </>
  )
}
