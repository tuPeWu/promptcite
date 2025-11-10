import React from 'react';

const Instructions = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Jak używać Prompt-Cite</h1>
      <div className="prose prose-lg space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Rozpoczęcie</h2>
          <ol className="list-decimal pl-6 space-y-4">
            <li>Kliknij przycisk "Rozpocznij cytowanie" na stronie głównej lub przejdź do generatora cytowań.</li>
            <li>Wklej swój prompt AI w pole tekstowe.</li>
            <li>Wpisz swoje nazwisko jako autora (lub zostanie ono automatycznie wypełnione, jeśli jesteś zalogowany).</li>
            <li>Wybierz model AI, którego używałeś z podanych opcji.</li>
            <li>Dodaj dodatkowe informacje o wersji modelu, jeśli to istotne.</li>
            <li>Kliknij "GENERUJ", aby utworzyć swoje cytowanie.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Korzystanie z cytowania</h2>
          <ul className="list-disc pl-6 space-y-4">
            <li>Skopiuj wygenerowane cytowanie bezpośrednio do swojej pracy naukowej, prezentacji lub dokumentacji.</li>
            <li>Użyj kodu QR, aby szybko udostępnić dostęp do swojego promptu i jego metadanych.</li>
            <li>Uzyskaj dostęp do zapisanych promptów w dowolnym momencie przez panel swojego konta.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Format cytowania</h2>
          <p>Cytowania są generowane w następującym formacie:</p>
          <pre className="bg-gray-50 p-4 rounded-md">
            [Autor], "Pierwsze pięć słów...", [Model AI], [Opcjonalne info], [Data], [Link do repozytorium]
          </pre>
        </section>
      </div>
    </div>
  );
};

export default Instructions;