export interface Usuario {
    cod_usuario: string,
    nome: string,
    dia_nasc: number,
    mes_nasc: number,
    ano_nasc: number,
    email: string
}

export interface UsuarioInterface {
    criarUsuario(user: Usuario);
    alterarUsuario(user: Usuario);
    alterarSenha(user: Usuario);
}