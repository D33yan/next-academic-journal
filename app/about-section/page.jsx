
import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from 
'@heroicons/react/24/outline'
const features = [
  {
    name: 'Push to deploy',
    description:
      'Contribute to our cause by Submitting new journals',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'SSL certificates',
    description:
      'Secure browser',
    icon: LockClosedIcon,
  },
  {
    name: 'Simple queues',
    description:
      'Takes no time at all',
    icon: ArrowPathIcon,
  },
  {
    name: 'Advanced security',
    description:
      'User Information is private',
    icon: FingerPrintIcon,
  },
]

export default function AboutSection() {
  return (
    <div className="border-t-2 bg-gray-800 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">For Better Learning</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            A quick solution to improve a better learning environment
          </p>
          <p className="mt-6 text-lg leading-8 text-white">
            Certified and Accessible Journals
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-800">
                    <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
