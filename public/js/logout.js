document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', async (event) => {
            event.preventDefault(); // Отменяем стандартное поведение ссылки
            try {
                const response = await fetch('/auth/logout', { method: 'POST', credentials: 'include' });
                if (response.ok) {
                    window.location.href = '/auth/login'; // Перенаправление на страницу логина
                } else {
                    console.error('Ошибка выхода из системы.');
                }
            } catch (error) {
                console.error('Ошибка сети:', error);
            }
        });
    }
});
