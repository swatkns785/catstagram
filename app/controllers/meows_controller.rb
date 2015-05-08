class MeowsController < ApplicationController
  # /posts/:post_id/meows
  def create
    # Find the Post that we're "meowing" at
    post = Post.find(params[:post_id])
    # Build a Meow by the current user for the post
    meow = current_user.meows.build(post: post)

    # if meow.save
    #   redirect_to :back, notice: "We heard your Meow!"
    # else
    #   redirect_to :back
    # end

    respond_to do |format|
      if meow.save
        meows = post.meows.count
        format.html { redirect_to :back, notice: "We heard your Meow!" }
        format.json { render json: { meow: meow, count: meows } }
      else
        format.html { redirect_to :back }
        format.json { render json: meow.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    post = Post.find(params[:post_id])
    current_user.meows.destroy(params[:id])

    respond_to do |format|
      format.html do
        flash[:notice] = "All evidence of your meowing has been destroyed!"
        redirect_to :back
      end

      count = post.meows.count
      # { head :no_content } <-- switched with below
      format.json { render json: count }
    end
  end
end
