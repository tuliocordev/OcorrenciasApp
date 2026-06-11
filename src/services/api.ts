const API_URL = 'https://api-ocorrencia.muapps.com.br';

export const SLUG_ALUNO = 'tulio';

export type CriarOcorrenciaPayload = {
    titulo: string,
    descricao: string,
    local: string,
    slug: string;
}

export type AtualizarOcorrenciaPayload = {
    titulo: string;
    descricao: string;
    local: string;
};

export async function listarOcorrenciaPorSlug(slug: string) {
    const resposta = await fetch(`${API_URL}/ocorrencias?slug=${slug}`);

    if (!resposta.ok) {
        throw new Error('Erro ao buscar ocorrencias');
    }

    return await resposta.json();
}

export async function criarOcorrencia(dados: CriarOcorrenciaPayload) {
    const resposta = await fetch(`${API_URL}/ocorrencias`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    });

    if (!resposta.ok) {
        throw new Error('Erro ao criar ocorrencia');
    }

    return await resposta.json();
}

export async function atualizarOcorrencia(id: string, dados: AtualizarOcorrenciaPayload) {
    const resposta = await fetch(`${API_URL}/ocorrencias/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    });

    if (!resposta.ok) {
        throw new Error('Erro ao atualizar ocorrência');
    }

    return await resposta.json();
}

export async function deletarOcorrencia(id: string) {
    const resposta = await fetch(`${API_URL}/ocorrencias/${id}`, {
        method: 'DELETE',
    });

    if (!resposta.ok) {
        throw new Error('Erro ao remover ocorrência');
    }

    return await resposta.json();
}