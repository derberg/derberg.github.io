import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SponsorButton from './SponsorButton'

const LayoutWrapper = ({ children }) => {
  return (
    <SectionContainer>
      <div className="flex flex-col justify-between h-screen">
        <header className="flex items-center justify-between py-10">
          <div>
            <Link href="/" aria-label="Brain Fart Dev">
              <div className="flex items-center justify-between">
                <div className="mr-3">
                  <Logo />
                </div>
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="hidden h-6 text-2xl font-semibold sm:block">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="p-1 font-medium text-gray-900 sm:p-4 dark:text-gray-100"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <div className="hidden sm:flex items-center space-x-4">
              <iframe
                src="https://github.com/sponsors/derberg/button"
                title="Sponsor derberg"
                height="32"
                width="114"
                style={{ border: 0, borderRadius: '6px' }}
              />
              <SponsorButton name="Book a Call" link="https://calendly.com/lpgornicki/15" />
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        {/* Mobile-only section */}
        <div className="sm:hidden space-y-4 mb-5 flex flex-col justify-center items-center">
          <SponsorButton
            name="Book a Call"
            link="https://calendly.com/lpgornicki/15"
            className="w-full max-w-xs h-8"
            fontSize="14px"
            marginLeft="0px"
          />
          <iframe
            src="https://github.com/sponsors/derberg/button"
            title="Sponsor derberg"
            className="w-full max-w-xs h-8"
            style={{ border: 0, borderRadius: '6px' }}
          />
        </div>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
