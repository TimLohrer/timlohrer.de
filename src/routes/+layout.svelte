<script lang="ts">
    import "../app.css";
</script>

<div class="main">
    <slot />
    <footer class="footer">
        <p class="copyright">Copyright {new Date().getFullYear()} - Tim Lohrer</p>
    </footer>
</div>

<style>
    .main {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    footer {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 3rem;
    }

    footer .copyright {
        color: white;
        font-family: 'SF-Mono-Bold';
        font-size: 11px;
    }
</style>