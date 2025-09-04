import { useState } from 'react'
import Image from './Image'
import Link from './Link'

const Card = ({ title, description, imgSrc, href, price, priceDetails, priceExplanation }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const truncated = description?.length > 100 ? description.slice(0, 100) + '...' : description

  return (
    <div className="p-4 md:w-1/2 md" style={{ maxWidth: '544px' }}>
      <div
        className={`${imgSrc && 'h-full'} overflow-hidden border-2 border-gray-200 rounded-md border-opacity-60 dark:border-gray-700`}
      >
        {imgSrc &&
          (href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              <Image
                alt={title}
                src={imgSrc}
                className="object-contain object-center lg:h-48 md:h-36"
                width={544}
                height={306}
              />
            </Link>
          ) : (
            <Image
              alt={title}
              src={imgSrc}
              className="object-contain object-center lg:h-48 md:h-36"
              width={544}
              height={306}
            />
          ))}
        <div className="p-6">
          <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`}>
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>

          <p className="mb-2 prose text-gray-500 max-w-none dark:text-gray-400">
            {isExpanded ? description : truncated}
          </p>

          {/* Actions: read more + learn more */}
          <div className="mt-2 flex items-center gap-4">
            {description?.length > 100 && (
              <button
                type="button"
                onClick={() => setIsExpanded((v) => !v)}
                aria-expanded={isExpanded}
                className="text-sm font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              >
                {isExpanded ? 'Show less' : 'Read more'}
              </button>
            )}

            {href && (
              <Link
                href={href}
                className="text-sm font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label={`Link to ${title}`}
              >
                Learn more &rarr;
              </Link>
            )}
          </div>

          {price && (
            <div className="mt-4">
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Price: {Array.isArray(price) ? `$${price[0]} - $${price[1]}` : `$${price}`}
              </p>
              {priceDetails && (
                <p className="text-sm text-gray-500 dark:text-gray-400">{priceDetails}</p>
              )}
              {priceExplanation && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{priceExplanation}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
