import { FC } from 'hono/jsx'
import { PlayHistoryObject } from '../types/Spotify'

type TopPageProps = {
	lastPlayedTrack: PlayHistoryObject
}

export const TopPage: FC<TopPageProps> = ({ lastPlayedTrack }) => {
	const year = new Date().getFullYear()

	return (
		<div
			x-data='{ play: false, is33rpm: true }'
			class='bg-zinc-900 h-screen mx-auto flex flex-col justify-center items-center gap-16 relative'
		>
			<div class='relative bg-indigo-300 text-zinc-900 sm:w-[384px] w-[320px] sm:h-[384px] h-[320px] rounded-full'>
				<div class='flex flex-col justify-center items-center h-full'>
					<div
						class='sm:w-[360px] sm:h-[360px] w-[300px] h-[300px] m-auto'
						x-bind:class="play && (is33rpm ? 'animate-[spin_1.82s_linear_infinite]' : 'animate-[spin_1.33s_linear_infinite]')"
					>
						<div class='absolute flex flex-col top-1/4 left-1/2 text-black transform -translate-x-1/2'>
							<span class='font-sans italic font-extrabold text-2xl'>
								hi6okuni
							</span>
							<span class='font-sans italic text-xs'>Software Engineer</span>
						</div>
						<div class='absolute flex flex-col top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-black'>
							<span>STEREO</span>
							<span class='font-sans italic font-extrabold text-xs'>
								33 1/3 RPM
							</span>
						</div>
						<div class='absolute flex flex-col top-1/2 left-3/4 transform -translate-x-1/4 -translate-y-1/2 text-black'>
							<span>SIDE A</span>
						</div>
						<div class='absolute flex flex-col items-center top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black sm:gap-1 gap-2'>
							<a
								href='https://www.linkedin.com/in/hi6okuni/'
								target='_blank'
								rel='noopener noreferrer'
								class='italic font-sans text-xs'
							>
								001. LinkedIn (3:31)
							</a>
							<a
								href='https://github.com/hi6okuni/'
								target='_blank'
								rel='noopener noreferrer'
								class='italic font-sans text-xs'
							>
								002. GitHub (3:25)
							</a>
							<a
								href='https://www.x.com/hi6okuni/'
								target='_blank'
								rel='noopener noreferrer'
								class='italic font-sans text-xs'
							>
								003. X (4:57)
							</a>
						</div>
						<svg class='overflow-visible' viewBox='0 0 100 100'>
							<title>Record Description</title>
							<path
								id='circle'
								d='M 0 50 A 50 50 0 1 1 0 51 z'
								fill='none'
								stroke='black'
								stroke-width='0.3'
							/>
							<text
								font-size='3'
								fill='rgb(165 180 252)'
								stroke='rgb(165 180 252)'
								stroke-width='3'
							>
								<textPath
									xlink:href='#circle'
									startOffset='75%'
									text-anchor='middle'
								>
									<tspan dy='2'>{`PROMOTIONAL USE ONLY - NOT FOR SALE / ©︎${year} hi6okuni.com`}</tspan>
								</textPath>
							</text>
							<text font-size='3'>
								<textPath
									xlink:href='#circle'
									startOffset='75%'
									text-anchor='middle'
								>
									<tspan dy='1'>{`PROMOTIONAL USE ONLY - NOT FOR SALE / ©︎${year} hi6okuni.com`}</tspan>
								</textPath>
							</text>
							<text
								font-size='3'
								fill='rgb(165 180 252)'
								stroke='rgb(165 180 252)'
								stroke-width='3'
							>
								<textPath
									xlink:href='#circle'
									startOffset='25%'
									text-anchor='middle'
								>
									<tspan dy='2'>
										Crafting software that makes people feel something special
									</tspan>
								</textPath>
							</text>
							<text font-size='3'>
								<textPath
									xlink:href='#circle'
									startOffset='25%'
									text-anchor='middle'
								>
									<tspan dy='1'>
										Crafting software that makes people feel something special
									</tspan>
								</textPath>
							</text>
							<circle cx='50.1' cy='50.1' r='4.2' fill='gray' />
							<circle cx='50' cy='50' r='4' fill='rgb(238 242 255)' />
							<circle
								cx='50'
								cy='50'
								r='16'
								fill='none'
								stroke='rgb(129 140 248)'
								stroke-width='0.1'
							/>
							<circle
								cx='50'
								cy='50'
								r='16.2'
								fill='none'
								stroke='rgb(224,231,255)'
								stroke-width='0.1'
							/>
						</svg>
					</div>
				</div>
			</div>
			<div class='flex flex-col items-start gap-4'>
				<label class='relative inline-flex items-center cursor-pointer'>
					<input
						type='checkbox'
						value=''
						class='sr-only peer'
						x-on:click='play = ! play'
					/>
					<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-lime-300 dark:peer-focus:ring-line-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-lime-300" />
					<span class='ms-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
						Play
					</span>
				</label>
				<label class='relative inline-flex items-center cursor-pointer'>
					<input
						type='checkbox'
						value=''
						class='sr-only peer'
						x-on:click='is33rpm = ! is33rpm'
					/>
					<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-indigo-400 dark:peer-focus:ring-indigo-400 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-300" />
					<span class='ms-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
						RPM: 33 / 45
					</span>
				</label>
			</div>

			<div class='absolute bottom-4 right-4 bg-zinc-800 text-white p-4 rounded-lg shadow-lg max-w-sm'>
				<h3 class='text-lg font-bold mb-2'>最後に再生した曲</h3>
				{lastPlayedTrack ? (
					<>
						<p class='text-sm mb-1'>曲名: {lastPlayedTrack.track.name}</p>
						<p class='text-sm mb-1'>
							アーティスト:{' '}
							{lastPlayedTrack.track.artists
								.map((artist) => artist.name)
								.join(', ')}
						</p>
					</>
				) : (
					<p class='text-sm'>再生履歴がありません</p>
				)}
			</div>
		</div>
	)
}
