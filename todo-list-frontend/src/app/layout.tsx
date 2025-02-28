import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import { Providers } from './providers'
import { SITE_NAME } from '@/constants/seo.constants'
import { Toaster } from "sonner";
import './globals.scss'

const zen = Noto_Sans({
	subsets: ['cyrillic', 'latin'],
	weight: ['300', '400', '500', '600', '700'],
	display: 'swap',
	variable: '--font-zen',
	style: ['normal']
})

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description: 'Best one for planning from RED GROUP [htmllessons.ru]'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${zen.variable}`}>
				<Providers>
					{children}{' '}
					<Toaster
						theme='dark'
						position='bottom-right'
						duration={1500}
					/>
				</Providers>
			</body>
		</html>
	)
}
