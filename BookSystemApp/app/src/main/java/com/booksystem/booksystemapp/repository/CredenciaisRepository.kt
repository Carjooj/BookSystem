package com.booksystem.booksystemapp.repository

import android.util.Log
import com.booksystem.booksystemapp.model.Credenciais
import com.google.gson.Gson
import okhttp3.Call
import okhttp3.Callback
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import okhttp3.Response
import java.io.IOException

class CredenciaisRepository {

    val gson = Gson()
    val okhttp = OkHttpClient()
    fun newCredenciais(credenciais: Credenciais){

//        val c = Credenciais(credenciais.username, credenciais.senha)
        val json = gson.toJson(credenciais);

        val body = json.toRequestBody("application/json".toMediaTypeOrNull())

        val req = Request.Builder()
            .post(body)
            .url("http://192.168.1.7:8080/booksystem/auth/register")
            .build()

        val res = object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                Log.e("fail", "call $call | Exception: ${e.localizedMessage}")
            }

            override fun onResponse(call: Call, response: Response) {
                val resposta = response.body
                Log.i("sucess", "call $call | \n Resposta: ${resposta}")
            }

        }

        okhttp.newCall(req).enqueue(res)

    }

}