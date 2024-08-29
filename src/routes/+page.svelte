<script>
	import GitHubLogo from '$lib/assets/github.png';

	// Close animation
	let closed = false;

	// Buttons
	let viewSourceText = 'View Source';
	let shareText = 'Share';

	// Tools & Technologies
	const frontend = ['HTML', 'CSS', 'JavaScript', 'Svelte', 'WebAssembly'];
	const backend = ['Node.js', 'Express', 'Ktor', 'Go', 'Rust', 'Python'];
	const databases = ['MongoDB', 'MySQL', 'SQLite', 'Redis'];
	const desktop = ['Tauri', 'Rust', 'Flutter', 'Dart'];
	const mobile = ['Flutter', 'Dart'];
	const projectManagement = ['Jira', 'Confluence', 'GitHub', 'GitHub Projects', 'GitHub Actions'];
	const servers = ['Linux', 'Bash', 'Nginx', 'Docker', 'Portainer', 'Kubernetes'];

	// Birtday calculations
	const currentDate = new Date();
	const birthday = new Date(2006, 3, 20);
	const age = currentDate.getFullYear() - birthday.getFullYear();

	if (currentDate.getMonth() > birthday.getMonth() && currentDate.getDate() > birthday.getDate()) {
		birthday.setFullYear(currentDate.getFullYear() + 1);
	} else {
		birthday.setFullYear(currentDate.getFullYear());
	}

	const daysUntilBirthday = Math.floor(
		(birthday.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
	);


	function close() {
		closed = true;
			setTimeout(() => {
				closed = false;
				setTimeout(() => {
					document.getElementById('error-popup')?.animate(
						[
							{ transform: 'translateX(0)' },
							{ transform: 'translateX(-2.5%)' },
							{ transform: 'translateX(0)' },
							{ transform: 'translateX(2.5%)' },
							{ transform: 'translateX(0)' }
						],
						{
							duration: 150,
							iterations: 2
						}
					);
				}, 250 + 100);
			}, 3 * 1000);
	}

	/**
	 * @param {string} url
	 */
	function openTab(url) {
		window.open(url, '_blank');
	}

	function share() {
		navigator.clipboard.writeText(window.location.href);
		shareText = 'Link Copied! ❤️';
		setTimeout(() => {
			shareText = 'Share';
		}, 1500);
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="body">
	<h1 style="position: absolute; font-size: 100px;">👀</h1>
	<div class="errorPopup" class:closed={closed} id="error-popup">
		<div class="header">
			<h1 class="title">Portfolio</h1>
			<div class="closeButton" id="close-button" on:click={close}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black">
					<path d="M0 0h24v24H0z" fill="none" />
					<path
						d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
					/>
				</svg>
			</div>
		</div>
		<div class="content">
			<p>
				Hi <span class="wave">👋</span><br />I am <b title="Yup, thats me! 🙋‍♂️">Tim Lohrer</b>.<br
				/>A
				<span
					title={daysUntilBirthday > 0
						? `${daysUntilBirthday} days until my birthday 🥳`
						: 'Today is my birthday! 🥳🥳🥳'}>{age}</span
				>
				year old full stack software engineer from Germany.<br /><br />I have over 5 years of
				experience with <b title={frontend.join(', ')}>frontend</b>,
				<b title={backend.join(', ')}>backend</b>, <b title={desktop.join(', ')}>desktop</b> &
				<b title={mobile.join(', ')}>cross platform mobile app</b> development, as well as
				<b title={projectManagement.join(', ')}>project management</b>,
				<b title={databases.join(', ')}>databases</b>
				and <b title={servers.join(', ')}>server infrastructure</b>.<br /><br />To learn more about
				what I do, check out my
				<span class="github" id="github" on:click={() => openTab('https://github.com/TimLohrer')}>
					<svg class="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330">
						<g stroke-linecap="round" stroke-linejoin="round"></g><g>
							<path
								d="M15,180h263.787l-49.394,49.394c-5.858,5.857-5.858,15.355,0,21.213C232.322,253.535,236.161,255,240,255 s7.678-1.465,10.606-4.394l75-75c5.858-5.857,5.858-15.355,0-21.213l-75-75c-5.857-5.857-15.355-5.857-21.213,0 c-5.858,5.857-5.858,15.355,0,21.213L278.787,150H15c-8.284,0-15,6.716-15,15S6.716,180,15,180z"
							></path>
						</g></svg
					>
					<img class="GitHubLogo" src={GitHubLogo} alt="GitHub Logo" /><b>GitHub</b></span
				>!
			</p>
		</div>
		<div class="buttons">
			<div class="button viewSourceButton" on:click={() => openTab('https://github.com/TimLohrer/timlohrer.de')}>
				<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 16L13 8" stroke="#000000" stroke-width="1.56" stroke-linecap="round"></path> <path d="M17 15L19.6961 12.3039V12.3039C19.8639 12.1361 19.8639 11.8639 19.6961 11.6961V11.6961L17 9" stroke="#000000" stroke-width="1.56" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M7 9L4.32151 11.6785V11.6785C4.14394 11.8561 4.14394 12.1439 4.32151 12.3215V12.3215L7 15" stroke="#000000" stroke-width="1.56" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
				<p>{viewSourceText}</p>
			</div>
			<div class="button shareButton" on:click={share}>
				{#if shareText == 'Share'}
					<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 8V5.2C8 4.0799 8 3.51984 8.21799 3.09202C8.40973 2.71569 8.71569 2.40973 9.09202 2.21799C9.51984 2 10.0799 2 11.2 2H18.8C19.9201 2 20.4802 2 20.908 2.21799C21.2843 2.40973 21.5903 2.71569 21.782 3.09202C22 3.51984 22 4.0799 22 5.2V12.8C22 13.9201 22 14.4802 21.782 14.908C21.5903 15.2843 21.2843 15.5903 20.908 15.782C20.4802 16 19.9201 16 18.8 16H16M5.2 22H12.8C13.9201 22 14.4802 22 14.908 21.782C15.2843 21.5903 15.5903 21.2843 15.782 20.908C16 20.4802 16 19.9201 16 18.8V11.2C16 10.0799 16 9.51984 15.782 9.09202C15.5903 8.71569 15.2843 8.40973 14.908 8.21799C14.4802 8 13.9201 8 12.8 8H5.2C4.0799 8 3.51984 8 3.09202 8.21799C2.71569 8.40973 2.40973 8.71569 2.21799 9.09202C2 9.51984 2 10.0799 2 11.2V18.8C2 19.9201 2 20.4802 2.21799 20.908C2.40973 21.2843 2.71569 21.5903 3.09202 21.782C3.51984 22 4.07989 22 5.2 22Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
				{/if}
				<p>{shareText}</p>
			</div>
		</div>
	</div>
</div>

<style>
	.body {
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgb(7, 75, 139);
		background: radial-gradient(circle, rgba(7, 75, 139, 1) 0%, rgba(15, 41, 54, 1) 75%);
		height: 100vh;
		width: 100vw;
		cursor: default;
	}

	.errorPopup {
		display: flex;
		align-items: center;
		flex-direction: column;
		height: 50%;
		max-width: 90%;
		min-width: 30%;
		max-height: 45%;
		min-height: 20%;
		aspect-ratio: 2 / 1;
		padding: 0.5em;
		background-color: #c2c7ca;
		transform: scale(1);
		transition-duration: 250ms;
		border-radius: 5px;
		box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
	}

	.errorPopup.closed {
		transform: scale(0);
	}

	.errorPopup .header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 14%;
		width: 97%;
		padding: 1% 1.5%;
		overflow: hidden;
		background-color: #0301ab;
		border-radius: 7.5px;
		box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
	}

	.errorPopup .header .title {
		color: #ffffff;
		font-size: 40px;
	}

	.errorPopup .header .closeButton {
		height: 75%;
		aspect-ratio: 1 / 1;
		background-color: #c2c7ca;
		color: black;
		overflow: hidden;
		box-shadow: 3.5px 3.5px 3.5px rgba(0, 0, 0, 0.5);
		border-radius: 5%;
		cursor: pointer;
	}

	.errorPopup .header .closeButton svg {
		transition-duration: 250ms;
	}

	.errorPopup .header .closeButton:hover svg {
		transform: scale(1.15);
	}

	.errorPopup .content {
		display: flex;
		height: 55%;
		width: 100%;
		margin-left: 1.5em;
		padding: 2em 0;
	}

	.errorPopup .content p {
		color: #000000;
		font-size: 25px;
		padding-right: 1.5em;
		line-height: 35px;
	}

	.errorPopup .content p .wave {
		position: absolute;
		margin-left: 12.5px;
		font-size: 32.5px;
		overflow: hidden;
		animation-name: wave;
		animation-duration: 2.5s;
		animation-iteration-count: infinite;
		transform-origin: 70% 70%;
		display: inline-block;
	}

	.errorPopup .content p .github {
		color: #000000;
		font-size: 25px;
		line-height: 35px;
		transition-duration: 200ms;
	}

	.errorPopup .content p .github:hover {
		background: linear-gradient(
			90deg,
			rgba(9, 121, 118, 1) 0%,
			rgba(9, 121, 118, 1) 35%,
			rgba(8, 54, 126, 1) 100%,
			rgba(8, 54, 126, 1) 100%
		);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		cursor: pointer;
	}

	.errorPopup .content p .github b {
		margin-left: 30px;
	}

	.errorPopup .content p .github .arrow {
		position: absolute;
		height: 25px;
		width: 25px;
		padding-top: 5px;
		transform: translateX(-22.5px);
		opacity: 0%;
		transition-duration: 150ms;
	}

	.errorPopup .content p .github:hover .arrow {
		opacity: 100%;
		transform: translateX(0);
	}

	.errorPopup .content p .github:hover .GitHubLogo {
		opacity: 0%;
		transform: translateX(-22.5px);
	}

	.errorPopup .content p .github .GitHubLogo {
		position: absolute;
		height: 22.5px;
		width: 22.5px;
		padding-top: 6.5px;
		filter: invert(1);
		opacity: 100%;
		transition-duration: 150ms;
	}

	.errorPopup .buttons {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		height: 15%;
		width: 100%;
		gap: 2em;
	}

	.errorPopup .buttons .button {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 95%;
		width: 17.5em;
		background-color: rgba(164, 169, 172, 0.421);
		outline: 2px solid rgb(118, 118, 118);
		border-radius: 5px;
		gap: 0.5em;
		cursor: pointer;
		transition-duration: 200ms;
	}

	.errorPopup .buttons .button p {
		font-size: 25px;
	}

	.errorPopup .buttons .shareButton svg {
		height: 32.5px;
	}

	.errorPopup .buttons .viewSourceButton svg {
		height: 60px;
	}

	.errorPopup .buttons .button:hover {
		background-color: rgba(164, 169, 172, 0.621);
		opacity: 75%;
	}

	.errorPopup .buttons .button:hover svg > * > path {
		stroke: #0301ab;
	}

	@keyframes wave {
		0% {
			transform: rotate(0deg);
		}
		10% {
			transform: rotate(14deg);
		}
		20% {
			transform: rotate(-8deg);
		}
		30% {
			transform: rotate(14deg);
		}
		40% {
			transform: rotate(-4deg);
		}
		50% {
			transform: rotate(10deg);
		}
		60% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(0deg);
		}
	}
</style>
